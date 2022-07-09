import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function BranchPage(props) {
    console.log("props", props)
    const [inputs, setInputs] = useState({
        branchname: '',
        businessservices: '',
        // industry:'',
    });
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const companies = useSelector(state=>state.companies.items);
    const branches = useSelector(state=> state.branches);
    const [submitted, setSubmitted] = useState(false);
    const { branchname, businessservices} = inputs;
    const dispatch = useDispatch();
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    useEffect(() => {
        dispatch(userActions.getAllC(user.id));
        dispatch(userActions.getCompanyBranches());
    }, []);

    console.log("here is user", user.id);
    console.log("here r companies", companies )
    console.log("here r branches", branches )
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
    //    if(user && user.role === "Admin"){
            if (user.id,companies && companies[0].id, branchname && businessservices ) {
                 console.log("here is the company Info", user.id,companies && companies[0].id,branchname, businessservices)
                 // get return url from location state or default to home page
                 const { from } = location.state || { from: { pathname: "/" } };
                dispatch(userActions.branch(user.id, companies && companies[0].id, branchname, businessservices, from));
            }
            else{
                <p>Your are not AUTHORIZED to create a branch</p>
                alert("Not Authorized")
            }
        // }
    }
    return(
        <div className="row">

        <div className="col-lg-6 ">
             <h1>Add Branch Here</h1>

             <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Branch Name </label>
                    <input type="text" name="branchname" value={branchname} onChange={handleChange} className={'form-control' + (submitted && !branchname ? ' is-invalid' : '')} />
                    {submitted && !branchname &&
                        <div className="invalid-feedback">Branchname is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Branch Service</label>
                    <input type="text" name="businessservices" value={businessservices} onChange={handleChange} className={'form-control' + (submitted && !businessservices ? ' is-invalid' : '')} />
                    {submitted && !businessservices &&
                        <div className="invalid-feedback">Businessservices is required</div>
                    }
                </div>
                {/* <div className="form-group">
                    <label>Industry</label>
                    <input type="text" name="industry" value={industry} onChange={handleChange} className={'form-control' + (submitted && !industry ? ' is-invalid' : '')} />
                    {submitted && !industry &&
                        <div className="invalid-feedback">Industry is required</div>
                    }
                </div> */}
                <div className="form-group">
                    <button className="btn btn-primary">
                        {/* {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                        Submit
                    </button>
                    {/* <Link to="/register" className="btn btn-link">Submit</Link> */}
                </div>
            </form>

            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
        <div className="col-lg-4 offset-lg-1">
            <h3>Branches List</h3>

            {branches.loading && <em>Loading branches...</em>}
            {branches.error && <span className="text-danger">ERROR: {branches.error}</span>}
            {branches.items &&
                <ul>
                    {branches.items.map((comp, index) =>
                        <li key={branches.id}>
                            {comp.branchname + ' || ' + comp.businessservices}
                            {
                                comp.deleting ? <em> - Deleting...</em>
                                // : comp.deleteError ? <span className="text-danger"> - ERROR: {comp.deleteError}</span>
                                : "" 
                            }
                            {/* {<p><Link to='/branch' target='_blank'> Click Me  </Link></p>} */}
                           {/* {<span> - <a onClick={() => handleNewBranch(comp.companyid)} className="text-primary">Create Branch</a></span>} */}
                        </li>
                    )}
                </ul>
            }

        </div>
        </div>
    )
}
export {BranchPage};
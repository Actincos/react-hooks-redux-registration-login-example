import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
// import { connect } from "react-redux";

function CompanyPage() {
    const [inputs, setInputs] = useState({
        businessname: '',
        businessnature: '',
        industry:'',
    });
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const companies = useSelector(state => state.companies);
    const [submitted, setSubmitted] = useState(false);
    const { businessname, businessnature ,industry} = inputs;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getAllC(user.id));
    }, []);


    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    console.log("here is user action", user.id)
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.id, businessname && businessnature && industry) {
            console.log("here is the company Info", user.id,businessname, businessnature, industry)
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.company(user.id, businessname, businessnature, industry, from));
        }
    }

    return (
        <div className="col-lg-8 ">
            {/* <h1>Hi {user.firstName} Please Add a company Here</h1> */}
            <h1>Add company Here</h1>
            {/* <p>You're logged in with React Hooks!!</p> onSubmit={handleSubmit} */}
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Busineess Name </label>
                    <input type="text" name="businessname" value={businessname} onChange={handleChange} className={'form-control' + (submitted && !businessname ? ' is-invalid' : '')} />
                    {submitted && !businessname &&
                        <div className="invalid-feedback">Businessname is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Business Nature</label>
                    <input type="text" name="businessnature" value={businessnature} onChange={handleChange} className={'form-control' + (submitted && !businessnature ? ' is-invalid' : '')} />
                    {submitted && !businessnature &&
                        <div className="invalid-feedback">Businessnature is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Industry</label>
                    <input type="text" name="industry" value={industry} onChange={handleChange} className={'form-control' + (submitted && !industry ? ' is-invalid' : '')} />
                    {submitted && !industry &&
                        <div className="invalid-feedback">Industry is required</div>
                    }
                </div>
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
    );
}
export { CompanyPage };
// export default connect(mapStateToProps)(CompanyPage);
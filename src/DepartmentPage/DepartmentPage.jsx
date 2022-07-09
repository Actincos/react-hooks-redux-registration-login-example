import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function DepartmentPage() {
    const [inputs, setInputs] = useState({
        departmentname: '',
    });
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const [submitted, setSubmitted] = useState(false);
    const { departmentname} = inputs;
    const dispatch = useDispatch();
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    console.log("here is user action", user.id)
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.id && departmentname ) {
            console.log("here is the department Info", user.id,departmentname)
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.department(user.id, departmentname , from));
        }
    }
    return(

        <div className="col-lg-8 ">
             <h1>Add Department Here</h1>

             <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Department Name </label>
                    <input type="text" name="departmentname" value={departmentname} onChange={handleChange} className={'form-control' + (submitted && !departmentname ? ' is-invalid' : '')} />
                    {submitted && !departmentname &&
                        <div className="invalid-feedback">Departmentname is required</div>
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
    )
}
export {DepartmentPage};
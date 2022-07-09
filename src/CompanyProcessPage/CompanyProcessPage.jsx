import React, { useState,useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function CompanyProcessPage() {
    const [inputs, setInputs] = useState({
        code: '',
        description: '',
        stepnumber:'',
        ismandatory:''
    });

    const {id} = useParams();
    const user = useSelector(state => state.authentication.user);
    const companies = useSelector(state => state.companies);
    const [submitted, setSubmitted] = useState(false);
    const { code, description ,stepnumber, ismandatory} = inputs;
    const dispatch = useDispatch();
    console.log("here is Company id", id);
    console.log("here is user", user);
    console.log("here is companies", companies);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (id, code, description ,stepnumber, ismandatory) {
            console.log("here are company Processess", id, code, description ,stepnumber, ismandatory)
            const { from } = location.state || { from: { pathname: "/" } };

            dispatch(userActions.companyProcess(id, code, description ,stepnumber, ismandatory, from));
        }
    }

    
    return (
        <div className="col-lg-8 ">
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Code</label>
                    <input type="text" name="code" value={code} onChange={handleChange} className={'form-control' + (submitted && !code ? ' is-invalid' : '')} />
                    {submitted && !code &&
                        <div className="invalid-feedback">Code is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" name="description" value={description} onChange={handleChange} className={'form-control' + (submitted && !description ? ' is-invalid' : '')} />
                    {submitted && !description &&
                        <div className="invalid-feedback">Description is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Step Number</label>
                    <input type="text" name="stepnumber" value={stepnumber} onChange={handleChange} className={'form-control' + (submitted && !stepnumber ? ' is-invalid' : '')} />
                    {submitted && !stepnumber &&
                        <div className="invalid-feedback">Stepnumber is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Is Mandatory</label>
                    <input type="text" name="ismandatory" value={ismandatory} onChange={handleChange} className={'form-control' + (submitted && !ismandatory ? ' is-invalid' : '')} />
                    {submitted && !ismandatory &&
                        <div className="invalid-feedback">is Mandatory is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                      
                        Submit
                    </button>
                   
                </div>
            </form>
        </div>
    )

}

export { CompanyProcessPage };
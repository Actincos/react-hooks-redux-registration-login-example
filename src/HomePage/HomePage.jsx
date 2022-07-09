import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage(props) {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const companies = useSelector(state => state.companies);
    const dispatch = useDispatch();

    console.log("here is user", user);
    console.log("here is companies", companies)
    useEffect(() => {
        dispatch(userActions.getAll());
        dispatch(userActions.getAllC(user.id));
        dispatch(userActions.getCompanyBranches());
    }, []);


    
    function handleDeleteUser(id) {
        
        dispatch(userActions.delete(id));
    }

    // function handleNewBranch(id) {
    //     console.log("here is the id ", id);
    //     <p>
    //        <Link to="/branch">Add New Branch</Link>
    //     </p>
    // }

    return (
        <div className="col-lg-11 offset-lg-1">
            <h1>Hi {user.firstName}!</h1>
            {/* <p>You're logged in with React Hooks!!</p> */}
            <p>Welcome to Smart ERP home Page</p>
            { user && user.role === 'Admin'?
            <p>
                <Link to="/company">Add New Company</Link>
            </p>:''
            }
            {/* <p>
                <Link to="/branch">Add New Branch</Link>
            </p> */}

            <p>
                {/* <Link to="/department">Add New Department</Link> */}
            </p>
            <h3>All registered Companies:</h3>
            {/* {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>} */}
            {/* {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            } */}
            {companies.loading && <em>Loading companies...</em>}
            {companies.error && <span className="text-danger">ERROR: {companies.error}</span>}
            {companies.items &&
                <ul>
                    {companies.items.map((comp, index) =>
                        <li key={comp.id}>
                            {comp.businessname + ' | ' + comp.businessnature}
                            {
                                comp.deleting ? <em> - Deleting...</em>
                                // : comp.deleteError ? <span className="text-danger"> - ERROR: {comp.deleteError}</span>
                                : <span> |
                                    {/* <a onClick={() => handleDeleteUser(comp.companyid)} className="text-primary">Delete</a>   */}
                                    <Link  to={`/branch/${comp.id}`}> Create/View Branch  </Link>  | <Link to={`/department/${comp.id}`}> Create Department  </Link>  | <Link to={`/compProcess/${comp.id}`}> Company Process  </Link> 
                                    </span> 
                                    
                            }
                            {/* {<p><Link to='/branch' '/branch/${comp.id}' target='_blank'> Click Me  </Link></p>} */}
                           {/* {<span> - <a onClick={() => handleNewBranch(comp.companyid)} className="text-primary">Create Branch</a></span>} */}
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };
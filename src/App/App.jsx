import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { CompanyPage} from '../CompanyPage';
import { BranchPage} from '../BranchPage';
import { DepartmentPage} from '../DepartmentPage';
import { CompanyProcessPage} from '../CompanyProcessPage';

function App() {
    const alert = useSelector(state => state.alert);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    console.log("here is the user =>",user && user.role);

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-lg-9 offset-lg-1">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            {/* { user && user.role === "Admin" ? */}
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/company" component={CompanyPage} />
                            <PrivateRoute exact path="/branch/:id" component = {BranchPage} />
                            <PrivateRoute exact path="/department/:id" component={DepartmentPage} />
                            <PrivateRoute exact path="/compProcess/:id" component={CompanyProcessPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" /> :''
                            {/* } */}
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };
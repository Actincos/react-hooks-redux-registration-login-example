import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    company,
    getAllC,
    branch,
    getCompanyBranches,
    department,
    companyProcess,
};

function login(username, password, from) {
    console.log("hitting login")
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    console.log("user action=>", user)
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}


//adding new Company
function company(userid, businessname, businessnature,industry, from) {
    console.log("hitting company", userid,businessname, businessnature, industry, form)
    return dispatch => {
        dispatch(request({ userid }));

        userService.company(userid, businessname, businessnature,industry)
            .then(
                company => { 
                    dispatch(success(company));
                    history.push(from);
                },
                error => {
                    console.log("here is the error!!", error)
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(company) { return { type: userConstants.COMPANY_REQUEST, company } }
    function success(company) { return { type: userConstants.COMPANY_SUCCESS, company } }
    function failure(error) { return { type: userConstants.COMPANY_FAILURE, error } }
}

// getAllCompnay

function getAllC(id) {
    console.log("getallc => ", id);
    return dispatch => {
        dispatch(request(id));

        userService.getAllC(id)
            .then(
                companies => dispatch(success(companies)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALLC_REQUEST, id } }
    function success(companies) { return { type: userConstants.GETALLC_SUCCESS, companies } }
    function failure(error) { return { type: userConstants.GETALLC_FAILURE, error } }
}

//add new branch
function branch(id, companyid, branchname, businessservices, from) {
    console.log("hitting Branch",id,companyid, branchname, businessservices )
    return dispatch => {
        dispatch(request({ id }));

        userService.branch(id,companyid, branchname, businessservices)
            .then(
                branch => { 
                    dispatch(success(branch));
                    history.push(from);
                },
                error => {
                    console.log("here is the error!!", error)
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(branch) { return { type: userConstants.BRANCH_REQUEST, branch } }
    function success(branch) { return { type: userConstants.BRANCH_SUCCESS, branch } }
    function failure(error) { return { type: userConstants.BRANCH_FAILURE, error } }
}
//get branches
function getCompanyBranches() {
    return dispatch => {
        dispatch(request());

        userService.getCompanyBranches()
            .then(
                branches => dispatch(success(branches)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETCOMPANYBRANCHES_REQUEST } }
    function success(branches) { return { type: userConstants.GETCOMPANYBRANCHES_SUCCESS, branches } }
    function failure(error) { return { type: userConstants.GETCOMPANYBRANCHES_FAILURE, error } }
}
//add new department
function department(id, departmentname, from) {
    console.log("hitting Department",id, departmentname )
    return dispatch => {
        dispatch(request({ id }));

        userService.department(id, departmentname)
            .then(
                department => { 
                    dispatch(success(department));
                    history.push(from);
                },
                error => {
                    console.log("here is the error!!", error)
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(department) { return { type: userConstants.DEPARTMENT_REQUEST, department } }
    function success(department) { return { type: userConstants.DEPARTMENT_SUCCESS, department } }
    function failure(error) { return { type: userConstants.DEPARTMENT_FAILURE, error } }
}


//adding Company Process
function companyProcess(companyid, code, description ,stepnumber, ismandatory, from) {
    console.log("hitting company process", companyid,code, description ,stepnumber, ismandatory, form)
    return dispatch => {
        dispatch(request({ companyid }));

        userService.companyProcess(companyid,code, description ,stepnumber, ismandatory)
            .then(
                companyprocess => { 
                    dispatch(success(companyprocess));
                    history.push(from);
                },
                error => {
                    console.log("here is the error!!", error)
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(companyprocess) { return { type: userConstants.COMPANYPROCESS_REQUEST, companyprocess } }
    function success(companyprocess) { return { type: userConstants.COMPANYPROCESS_SUCCESS, companyprocess } }
    function failure(error) { return { type: userConstants.COMPANYPROCESS_FAILURE, error } }
}
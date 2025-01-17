import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    company,
    getAllC,
    branch,
    getCompanyBranches,
    department,
    companyProcess,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
    return fetch(`${config.apiUrl}/company/allComapny`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    console.log("user service=>", user)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


//add new company 
function company(userid,businessname, businessnature,industry) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({userid, businessname, businessnature,industry})
    };

    return fetch(`${config.apiUrl}/company/addCompany`, requestOptions)
        .then(handleResponse)
        .then(company => {
            console.log("here is the api response", company)
            return company;
         });
}

function getAllC(id) {
    console.log("allC", id);
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
    return fetch(`${config.apiUrl}/company/allComapny/${id}`, requestOptions).then(handleResponse);
}

//add new branch
function branch(userid,companyid,branchname, businessservices) {
    console.log("here is the branch service FE",userid,companyid,branchname, businessservices)
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({userid, companyid, branchname, businessservices})
    };

    return fetch(`${config.apiUrl}/branches/addBranch`, requestOptions)
        .then(handleResponse)
        .then(branch => {
            console.log("here is the api response", branch)
            return branch;
         });
}
//get branches
function getCompanyBranches() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/branches/allbranches`, requestOptions).then(handleResponse);
}
//add new department
function department(companyid,departmentname) {
    console.log("here is the branch service FE")
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({companyid,departmentname})
    };

    return fetch(`${config.apiUrl}/department/adddepartment`, requestOptions)
        .then(handleResponse)
        .then(dept => {
            console.log("here is the api response", dept)
            return dept;
         });
}

//add new companyProcess

function companyProcess(companyid,code, description ,stepnumber, ismandatory) {
    console.log("in user service", companyid,code, description ,stepnumber, ismandatory)
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({companyid,code, description ,stepnumber, ismandatory})
    };

    return fetch(`${config.apiUrl}/companyProcess/addCompanyProcess`, requestOptions)
        .then(handleResponse)
        .then(companyprocess=> {
            console.log("here is the api response", companyprocess)
            return companyprocess;
         });
}
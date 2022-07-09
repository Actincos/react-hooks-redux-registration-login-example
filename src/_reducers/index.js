import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {company} from './company.reducer';
import { companies } from './companies.reducer';
import {branch} from './branch.reducer';
import{branches} from './branches.reducer'

//here i will have to insert get company and get branch reducers

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    company,
    companies,
    branch,
    branches,
});

export default rootReducer;
import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};


export function companies(state = initialState, action) {
    switch (action.type) {
         case userConstants.GETALLC_REQUEST:
                return {
                    loading: true
                };
            case userConstants.GETALLC_SUCCESS:
                return {
                    items: action.companies
                };
            case userConstants.GETALLC_FAILURE:
                return {
                    error: action.error
                };
            default:
                return state
    }
}
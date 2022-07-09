import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};


export function branches(state = initialState, action) {
    switch (action.type) {
         case userConstants.GETCOMPANYBRANCHES_REQUEST:
                return {
                    loading: true
                };
            case userConstants.GETCOMPANYBRANCHES_SUCCESS:
                return {
                    items: action.branches
                };
            case userConstants.GETCOMPANYBRANCHES_FAILURE:
                return {
                    error: action.error
                };
            default:
                return state
    }
}
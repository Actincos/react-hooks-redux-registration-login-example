import { userConstants } from '../_constants';

export function company(state = {}, action) {
    switch (action.type) {
        case userConstants.COMPANY_REQUEST:
            return {
                loading: true
            };
        case userConstants.COMPANY_SUCCESS:
            return {
                loggedIn: true,
                items: action.companies
            };
        case userConstants.COMPANY_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
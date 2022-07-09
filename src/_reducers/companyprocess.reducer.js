import { userConstants } from '../_constants';
export function companyprocess(state = {}, action) {
    switch (action.type) {
        case userConstants.COMPANYPROCESS_REQUEST:
            return {
                loading: true
            };
        case userConstants.COMPANYPROCESS_SUCCESS:
            return {
                loggedIn: true,
                items: action.companyprocess
            };
        case userConstants.COMPANYPROCESS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
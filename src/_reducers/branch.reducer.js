import { userConstants } from '../_constants';

export function branch(state = {}, action) {
    switch (action.type) {
        case userConstants.BRANCH_REQUEST:
            return {
                loading: true
            };
        case userConstants.BRANCH_SUCCESS:
            return {
                // loggedIn: true,
                branch: action.branch
            };
        case userConstants.BRANCH_FAILURE:
            return {};
        // case userConstants.LOGOUT:
        //     return {};
        default:
            return state
    }
}
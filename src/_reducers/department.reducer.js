import { userConstants } from '../_constants';

export function department(state = {}, action) {
    switch (action.type) {
        case userConstants.DEPARTMENT_REQUEST:
            return {
                loading: true
            };
        case userConstants.DEPARTMENT_SUCCESS:
            return {
                // loggedIn: true,
                items: action.department
            };
        case userConstants.DEPARTMENT_FAILURE:
            return {};
        // case userConstants.LOGOUT:
        //     return {};
        default:
            return state
    }
}
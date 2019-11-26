
import { userConstants } from '../actions/user.js';

const INITIAL_STATE = {
    loggedIn: false,
    user: {}
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
    case userConstants.LOGOUT:
        return INITIAL_STATE
    default:
      return state;
  }
};

export default user;
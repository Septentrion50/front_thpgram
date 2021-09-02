import Cookies from "js-cookie";
import { REGISTER, LOGIN, LOGOUT, GET_USER, AUTH_FAILURE } from "redux/actions/authActions";

const initialState = {
  user: null,
  errors: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case GET_USER:
    case LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case AUTH_FAILURE:
      return {
        ...state,
        errors: action.payload
      };
    case LOGOUT:
      Cookies.remove('token');
      Cookies.remove('id');
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
import {
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILD,
  LOGOUT,
  CLEAR_ERR,
} from "../actions/actionTypes";
const initState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  errors: null,
};
const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return { ...state, user: action.payload, errors: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        errors: null,
      };
    case CLEAR_ERR:
    case LOAD_USER_FAILD:
    case LOGIN_FAILD:
    case REGISTER_FAILD:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        errors: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { user: null, isAuth: false, errors: null };
    default:
      return state;
  }
};
export default AuthReducer;

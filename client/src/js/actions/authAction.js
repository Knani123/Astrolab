import {
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILD,
  LOGOUT,
  CLEAR_ERR,
} from "./actionTypes";
import axios from "axios";
import setToken from "./setToken";

//register action
export const registerUser = (info) => (dispatch) => {
  axios
    .post("/register", info)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILD,
        payload: err.response.data.errors,
      });
    });
};

//login User action
export const loginUser = (info) => (dispatch) => {
  axios
    .post("/login", info)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILD,
        payload: err.response.data.errors,
      });
    });
};

//load user action
export const loadUser = () => (dispatch) => {
  setToken();
  axios
    .get("/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAILD,
        payload: err.response.data.msg,
      })
    );
};
//// log Out action
export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
//// Clear ERR
export const clearErr = () => (dispatch) => {
  dispatch({ type: CLEAR_ERR, payload: null });
};

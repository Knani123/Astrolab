import {
  ADD_WISH,
  ADD_WISH_FAIL,
  GET_WISH_LIST,
  GET_WISH_LIST_FAIL,
  CLEAR_ERR_WISH,
} from "./actionTypes";
import axios from "axios";

//add wishList
export const addWish = (info) => (dispatch) => {
  axios
    .post("/wish", info)
    .then((res) => {
      dispatch({
        type: ADD_WISH,
        payload: res.data,
      });
      getWishList();
    })
    .catch((err) => {
      dispatch({
        type: ADD_WISH_FAIL,
        payload: err.response.data.errors,
      });
    });
};

//get wishList
export const getWishList = () => (dispatch) => {
  axios
    .get("/wish")
    .then((res) => {
      dispatch({
        type: GET_WISH_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_WISH_LIST_FAIL,
        payload: err.response.data.errors,
      });
    });
};
//// Clear ERR
export const clearErrwish = () => (dispatch) => {
  dispatch({ type: CLEAR_ERR_WISH, payload: null });
};

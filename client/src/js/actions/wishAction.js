import {
  ADD_WISH,
  ADD_WISH_FAIL,
  GET_WISH_LIST,
  GET_WISH_LIST_FAIL,
  CLEAR_ERR_WISH,
  DELETE_WISH_SUCCESS,
  DELETE_WISH_SUCCESS_FAIL,
  EDIT_WISH,
  EDIT_WISH_FAIL,
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
//delete Wishlist
export const deleteWish = (id) => (dispatch) => {
  axios
    .delete(`wish/${id}`)
    .then(() => {
      dispatch(getWishList());
      dispatch({ type: DELETE_WISH_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_WISH_SUCCESS_FAIL,
        payload: err.response.data.errors,
      });
    });
};
//Edit wish

export const editWish = (id, info) => (dispatch) => {
  axios
    .put(`/wish/${id}`, info)
    .then(() => {
      console.log("edit success");
      dispatch(getWishList());
      dispatch({
        type: EDIT_WISH,
      });
    })
    .catch((err) => {
      console.log("edit fail");
      dispatch({
        type: ADD_WISH_FAIL,
        payload: err.response.data.errors,
      });
    });
};

import {
  ADD_WISH,
  ADD_WISH_FAIL,
  GET_WISH_LIST,
  GET_WISH_LIST_FAIL,
} from "./actionTypes";
import axios from "axios";

//add wishList
export const addWish = (info) => (dispatch) => {
  console.log(info);
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
      console.log(err.response.data);
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
      console.log(res.data);
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

import axios from "axios";
import {
  ADD_Product,
  ADD_Product_FAIL,
  GET_Product_LIST,
  GET_Product_LIST_FAIL,
} from "../actions/actionTypes";

//Add  Product
export const addProduct = (info) => (dispatch) => {
  axios
    .post("/product", info)
    .then((res) => {
      dispatch({
        type: ADD_Product,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response, info);
      dispatch({
        type: ADD_Product_FAIL,
        payload: err.response.data.errors,
      });
    });
};

//get Users Products
export const getMyProducts = () => (dispatch) => {
  axios
    .get("/product/owner")
    .then((res) => {
      dispatch({
        type: GET_Product_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_Product_LIST_FAIL,
        payload: err.response.data.errors,
      });
    });
};

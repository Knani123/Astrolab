import axios from "axios";
import {
  ADD_Product,
  ADD_Product_FAIL,
  GET_Product_LIST,
  GET_Product_LIST_FAIL,
  CLEAR_ERR_PROD,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS_FAIL,
  EDIT_PRODUCT,
  EDIT_PRODUCT_FAIL,
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

//// Clear ERR
export const clearErrProd = () => (dispatch) => {
  dispatch({ type: CLEAR_ERR_PROD, payload: null });
};
//delete product
export const deleteproduct = (id) => (dispatch) => {
  axios
    .delete(`/product/${id}`)
    .then(() => {
      dispatch(getMyProducts());
      dispatch({ type: DELETE_PRODUCT_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS_FAIL,
        payload: err.response.data.errors,
      });
    });
};
//Edit product
export const editProduct = (id, info) => (dispatch) => {
  console.log(id, info);
  axios
    .put(`/product/${id}`, info)
    .then(() => {
      dispatch(getMyProducts());
      dispatch({
        type: EDIT_PRODUCT,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: EDIT_PRODUCT_FAIL,
        payload: err.response.data.errors,
      });
    });
};

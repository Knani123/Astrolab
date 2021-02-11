import { SET_CURRENCY } from "./actionTypes";
import axios from "axios";

export const setCurrency = (curr) => (dispatch) => {
  dispatch({
    type: SET_CURRENCY,
    payload: curr,
  });
};

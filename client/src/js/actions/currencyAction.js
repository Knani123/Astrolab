import { SET_CURRENCY } from "./actionTypes";

export const setCurrency = (curr) => (dispatch) => {
  dispatch({
    type: SET_CURRENCY,
    payload: curr,
  });
};

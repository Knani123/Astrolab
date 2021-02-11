import { SET_CURRENCY } from "../actions/actionTypes";
const initState = { currency: "" };

const CurrencyReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENCY:
      return { currency: action.payload };

    default:
      return state;
  }
};

export default CurrencyReducer;

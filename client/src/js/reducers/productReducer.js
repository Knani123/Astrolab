import {
  ADD_Product,
  ADD_Product_FAIL,
  GET_Product_LIST,
  GET_Product_LIST_FAIL,
  CLEAR_ERR_PROD,
  EDIT_PRODUCT_FAIL,
} from "../actions/actionTypes";
const initState = {
  Products: [],
  errors: null,
};

const ProductReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_Product_LIST:
      return { Products: action.payload, errors: null };
    case ADD_Product:
      return { errors: null, Products: [...state.Products, action.payload] };
    case GET_Product_LIST_FAIL:
    case EDIT_PRODUCT_FAIL:
    case CLEAR_ERR_PROD:
    case ADD_Product_FAIL:
      console.log("payload", action.payload);
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

export default ProductReducer;

import {
  ADD_Product,
  ADD_Product_FAIL,
  GET_Product_LIST,
  GET_Product_LIST_FAIL,
  CLEAR_ERR_PROD,
} from "../actions/actionTypes";
const initState = {
  Products: [
    {
      _id: 1,
      name: "sport",
      Description: "blablabla",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      Status: "to buy",
      Price: 700,
    },
    {
      _id: 2,
      name: "Hunt",
      Description: "blablabla",
      image: "Image",
      Status: "Bought",
      Price: 800,
    },
  ],
  errors: null,
};

const ProductReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_Product_LIST:
      return { Products: action.payload, errors: null };
    case ADD_Product:
      return { errors: null, Products: [...state.Products, action.payload] };
    case GET_Product_LIST_FAIL:
    case CLEAR_ERR_PROD:
    case ADD_Product_FAIL:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

export default ProductReducer;

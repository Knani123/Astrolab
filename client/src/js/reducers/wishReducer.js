import {
  ADD_WISH,
  ADD_WISH_FAIL,
  GET_WISH_LIST,
  GET_WISH_LIST_FAIL,
  CLEAR_ERR_WISH,
} from "../actions/actionTypes";
const initState = { wishs: [], errors: null };

const WishReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_WISH_LIST:
      return { wishs: action.payload, errors: null };
    case ADD_WISH:
      return { errors: null, wishs: [...state.wishs, action.payload] };
    case GET_WISH_LIST_FAIL:
    case CLEAR_ERR_WISH:
    case ADD_WISH_FAIL:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

export default WishReducer;

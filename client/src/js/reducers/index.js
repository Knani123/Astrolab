import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import WishReducer from "./wishReducer";
import ProductReducer from "./productReducer";
const rootReducers = combineReducers({
  auth: AuthReducer,
  wish: WishReducer,
  products: ProductReducer,
});

export default rootReducers;

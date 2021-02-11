import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import WishReducer from "./wishReducer";
import ProductReducer from "./productReducer";
import CurrencyReducer from "./currencyReducer";
const rootReducers = combineReducers({
  auth: AuthReducer,
  wish: WishReducer,
  products: ProductReducer,
  currency: CurrencyReducer,
});

export default rootReducers;

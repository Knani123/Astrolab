import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import WishReducer from "./wishReducer";
const rootReducers = combineReducers({ auth: AuthReducer, wish: WishReducer });

export default rootReducers;

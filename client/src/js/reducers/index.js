import { combineReducers } from "redux";
import AuthReducer from "./authReducer";

const rootReducers = combineReducers({ auth: AuthReducer });

export default rootReducers;

import { combineReducers } from "redux";
import adminReducer from "./admin";
import buyerReducer from "./buyer";
import sellerReducer from "./seller";
import loginReducer from "./login";

export default combineReducers({
    adminReducer,
    buyerReducer,
    sellerReducer,
    loginReducer
})
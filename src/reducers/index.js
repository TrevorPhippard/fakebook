import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  pageState: userReducer
});

export default rootReducer;

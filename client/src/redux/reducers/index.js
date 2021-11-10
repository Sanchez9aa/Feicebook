import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  auth: userReducer
});

export default reducers
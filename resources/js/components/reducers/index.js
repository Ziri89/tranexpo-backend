import { combineReducers } from "redux";
import LogInReducer from "./LogInReducer";
import message from "./message";

const allReducers = combineReducers({
    LogInReducer,
    message
});

export default allReducers;

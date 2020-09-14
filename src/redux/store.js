import {combineReducers, createStore} from "redux";
import auditoriumReducer from "./auditoriumReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({auditoriumReducer, authReducer})

let store = createStore(reducers)

export default store;
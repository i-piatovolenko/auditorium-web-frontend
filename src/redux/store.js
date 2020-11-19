import {applyMiddleware, combineReducers, createStore} from "redux";
import auditoriumReducer from "./auditoriumReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({auditoriumReducer, authReducer})

let store = createStore(reducers, applyMiddleware(thunk))

export default store;
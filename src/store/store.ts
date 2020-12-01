import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import classroomsReducer from "./classroomsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({classroomsReducer, usersReducer, authReducer});
let store = createStore(reducers,applyMiddleware(thunk));

export default store;
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import classroomsReducer from "./classroomsReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({classroomsReducer, usersReducer});
let store = createStore(reducers,applyMiddleware(thunk));

export default store;
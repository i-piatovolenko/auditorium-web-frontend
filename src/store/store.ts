import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import classroomsReducer from "./classroomsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";

let reducers = combineReducers({classroomsReducer, usersReducer, authReducer, registerReducer});
let store = createStore(reducers,applyMiddleware(thunk));

export default store;
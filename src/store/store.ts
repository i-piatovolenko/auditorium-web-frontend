import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import classroomsReducer from "./classroomsReducer";

let reducers = combineReducers({classroomsReducer});
let store = createStore(reducers,applyMiddleware(thunk));

export default store;
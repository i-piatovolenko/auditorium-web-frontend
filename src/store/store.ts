import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import classrooms from "./reducers/classrooms";
import users from "./reducers/users";
import auth from "./reducers/auth";
import register from "./reducers/register";

let reducers = combineReducers({
  classroomsReducer: classrooms,
  usersReducer: users,
  authReducer: auth,
  registerReducer: register,
});
let store = createStore(reducers, applyMiddleware(thunk));

export default store;

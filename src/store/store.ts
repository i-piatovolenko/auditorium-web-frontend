import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import classrooms from "./reducers/classrooms";
import users from "./reducers/users";
import auth from "./reducers/auth";
import register from "./reducers/register";
import auditorium from "./reducers/auditorium";

let rootReducer = combineReducers({
  classroomsReducer: classrooms,
  usersReducer: users,
  authReducer: auth,
  registerReducer: register,
  auditoriumReducer: auditorium,
});
let store = createStore(rootReducer, applyMiddleware(thunk));

type RootReducerType = typeof rootReducer;
export type AuditoriumStateType = ReturnType<RootReducerType>;

export default store;

import {
  Classroom,
  FreeClassroomAction,
  Occupied,
  OccupyClassroomAction,
  RegisterUnit,
  SetClassroomsAction,
  SetDisabledButtonAction,
  SetIsFetchingAction,
  SetUntilValueAction,
  SetUserIdValueAction,
  SetUsersAction,
  User,
} from "./types";

export const SET_CLASSROOMS = "SET_CLASSROOMS";
export const FREE_CLASSROOM = "FREE_CLASSROOM";
export const OCCUPY_CLASSROOM = "OCCUPY_CLASSROOM";
export const SET_USER_ID_VALUE = "SET_USER_ID_VALUE";
export const SET_UNTIL_VALUE = "SET_UNTIL_VALUE";
export const SET_IS_FETCHING = "SET_IS_FETCHING";
export const SET_DISABLED_BUTTON = "SET_DISABLED_BUTTON";

export const SET_IS_LOGGED = "SET_IS_LOGGED";

export const SET_REGISTER = "SET_REGISTER";

export const SET_USERS = "SET_USERS";

//classrooms

export const setClassrooms = (
  classrooms: Array<Classroom>
): SetClassroomsAction => ({
  type: SET_CLASSROOMS,
  classrooms,
});
export const freeClassroomAC = (
  classroomName: string
): FreeClassroomAction => ({
  type: FREE_CLASSROOM,
  classroomName: classroomName,
});
export const occupyClassroomAC = (
  occupied: Occupied | null,
  classroomName: string
): OccupyClassroomAction => ({
  type: OCCUPY_CLASSROOM,
  classroomName: classroomName,
  occupied,
});
export const setUserIdValue = (value: number): SetUserIdValueAction => ({
  type: SET_USER_ID_VALUE,
  value,
});
export const setUntilValue = (value: number): SetUntilValueAction => ({
  type: SET_UNTIL_VALUE,
  value,
});
export const setIsFetching = (value: boolean): SetIsFetchingAction => ({
  type: SET_IS_FETCHING,
  value,
});
export const setDisabledButton = (value: boolean): SetDisabledButtonAction => ({
  type: SET_DISABLED_BUTTON,
  value,
});

//auth

export const setIsLogged = (isLogged: boolean) => ({
  type: SET_IS_LOGGED,
  isLogged,
});

//register

export const setRegister = (register: Array<RegisterUnit>) => ({
  type: SET_REGISTER,
  register,
});

//users

export const setUsers = (users: Array<User>): SetUsersAction => ({
  type: SET_USERS,
  users,
});

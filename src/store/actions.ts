import {
  Classroom,
  FreeClassroomAction,
  Me,
  Occupied,
  OccupyClassroomAction,
  RegisterUnit,
  SetClassroomsAction,
  SetClassroomsFilterAction,
  SetDisabledButtonAction,
  SetIsFetchingAction,
  SetIsLoggedAction,
  SetLoginDataAction,
  SetModalVisibleAction,
  SetUntilValueAction,
  SetUserIdValueAction,
  SetUsersAction, SetVisibleEditModalAction,
  User,
} from "./types";

export const SET_CLASSROOMS = "SET_CLASSROOMS";
export const FREE_CLASSROOM = "FREE_CLASSROOM";
export const OCCUPY_CLASSROOM = "OCCUPY_CLASSROOM";
export const SET_USER_ID_VALUE = "SET_USER_ID_VALUE";
export const SET_UNTIL_VALUE = "SET_UNTIL_VALUE";
export const SET_IS_FETCHING = "SET_IS_FETCHING";
export const SET_DISABLED_BUTTON = "SET_DISABLED_BUTTON";
export const SET_CLASSROOMS_FILTER = "SET_CLASSROOMS_FILTER";
export const SET_MODAL_VISIBLE = "SET_MODAL_VISIBLE";

export const SET_IS_LOGGED = "SET_IS_LOGGED";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";

export const SET_REGISTER = "SET_REGISTER";

export const SET_USERS = "SET_USERS";
export const SET_VISIBLE_EDIT_MODE = "SET_VISIBLE_EDIT_MODE";

//classrooms

export const setClassroomsFilter = (
  filter: string
): SetClassroomsFilterAction => ({
  type: SET_CLASSROOMS_FILTER,
  filter,
});

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

export const setModalVisible = (value: boolean): SetModalVisibleAction => ({
  type: SET_MODAL_VISIBLE,
  value,
});

//auth

export const setIsLogged = (isLogged: boolean): SetIsLoggedAction => ({
  type: SET_IS_LOGGED,
  isLogged,
});

export const setLoginData = (data: Me): SetLoginDataAction => ({
  type: SET_LOGIN_DATA,
  data,
});
export const setVisibleEditModal = (value: boolean): SetVisibleEditModalAction => ({
  type: SET_VISIBLE_EDIT_MODE,
  value,
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

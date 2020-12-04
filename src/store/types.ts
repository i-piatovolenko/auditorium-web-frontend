import {
  FREE_CLASSROOM,
  OCCUPY_CLASSROOM,
  SET_CLASSROOMS,
  SET_DISABLED_BUTTON,
  SET_IS_FETCHING,
  SET_IS_LOGGED,
  SET_REGISTER,
  SET_UNTIL_VALUE,
  SET_USER_ID_VALUE,
  SET_USERS,
} from "./actions";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export enum userTypes {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  POST_GRADUATE = "POST_GRADUATE",
  ADMINISTRATION = "ADMINISTRATION",
  CONCERTMASTER = "CONCERTMASTER",
  ILLUSTRATOR = "ILLUSTRATOR",
  OTHER = "OTHER",
}

export interface User {
  id: number;
  firstName: string;
  patronymic: string;
  lastName: string;
  type: userTypes;
  department: string;
}

export interface Me extends User {
  token: string;
  email: string;
  password: string;
  phoneNumber: string;
  extraPhoneNumbers?: string;
  isLogged: boolean;
}
export interface Occupied {
  user: User;
  until: number;
}

export interface Instrument {}

export interface Comment {}

interface Disabled {}

interface ScheduleUnit {}

export interface Classroom {
  id: number;
  name: string;
  chair: string | null;
  special: string | null;
  floor: number;
  isWing: boolean;
  description: string;
  occupied: Occupied | null;
  instruments: Array<Instrument>;
  comments: Array<Comment>;
  disabled: Disabled;
  schedule: Array<ScheduleUnit>;
}

export interface RegisterUnit {
  id: number;
  user: {
    lastName: string;
  };
  classroom: {
    name: string;
  };
  start: Date | null;
  end: Date | null;
}

export interface RegisterState {
  register: Array<RegisterUnit>;
}

export interface UsersState {
  users: Array<User>;
}

export interface ClassroomsState {
  classrooms: Array<Classroom>;
  userIdValue: number;
  untilValue: number;
  isFetching: boolean;
  disabledButton: boolean;
}

//Actions

export type SetUsersAction = {
  type: typeof SET_USERS;
  users: Array<User>;
};

export type UsersActions = SetUsersAction;

export type SetIsLoggedAction = {
  type: typeof SET_IS_LOGGED;
  isLogged: boolean;
};

export type AuthActions = SetIsLoggedAction;

export type SetClassroomsAction = {
  type: typeof SET_CLASSROOMS;
  classrooms: Array<Classroom>;
};
export type FreeClassroomAction = {
  type: typeof FREE_CLASSROOM;
  classroomName: string;
};
export type OccupyClassroomAction = {
  type: typeof OCCUPY_CLASSROOM;
  classroomName: string;
  occupied: Occupied | null;
};
export type SetUserIdValueAction = {
  type: typeof SET_USER_ID_VALUE;
  value: number;
};
export type SetUntilValueAction = {
  type: typeof SET_UNTIL_VALUE;
  value: number;
};
export type SetIsFetchingAction = {
  type: typeof SET_IS_FETCHING;
  value: boolean;
};
export type SetDisabledButtonAction = {
  type: typeof SET_DISABLED_BUTTON;
  value: boolean;
};

export type ClassroomsActions =
  | FreeClassroomAction
  | SetClassroomsAction
  | OccupyClassroomAction
  | SetUserIdValueAction
  | SetUntilValueAction
  | SetIsFetchingAction
  | SetDisabledButtonAction;

export type SetRegisterAction = {
  type: typeof SET_REGISTER;
  register: Array<RegisterUnit>;
};

export type RegisterActions = SetRegisterAction;
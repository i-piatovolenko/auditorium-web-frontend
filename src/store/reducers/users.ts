import { SET_USERS } from "../actions";
import {UsersActions, UsersState, userTypes} from "../types";

const initialState: UsersState = {
  users: [
    {
      id: 0,
      firstName: "",
      patronymic: "",
      lastName: "",
      type: userTypes.OTHER,
      department: "",
      email: "",
      phoneNumber: "",
      extraPhoneNumbers: "",
    },
  ],
};

const users = (state = initialState, action: UsersActions): UsersState => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    default:
      return state;
  }
};

export default users;

import {
  SET_IS_LOGGED,
  SET_LOGIN_DATA,
  SET_VISIBLE_EDIT_MODE,
} from "../actions";
import { AuthActions, Me, userTypes } from "../types";

const initialState: Me = {
  id: 0,
  token: "",
  firstName: "Ivan",
  patronymic: "",
  lastName: "John",
  type: userTypes.OTHER,
  department: "",
  email: "",
  phoneNumber: "",
  extraPhoneNumbers: "",
  isLogged: false,
  visibleEditModal: false,
};

const auth = (state = initialState, action: AuthActions): Me => {
  switch (action.type) {
    case SET_IS_LOGGED: {
      return { ...state, isLogged: action.isLogged };
    }
    case SET_LOGIN_DATA: {
      return {
        ...state,
        id: action.data.id,
        token: action.data.token,
        firstName: action.data.firstName,
        patronymic: action.data.patronymic,
        lastName: action.data.lastName,
        type: action.data.type,
        department: action.data.department,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        extraPhoneNumbers: action.data.extraPhoneNumbers,
      };
    }
    case SET_VISIBLE_EDIT_MODE:
      return { ...state, visibleEditModal: action.value };
    default:
      return state;
  }
};

export default auth;

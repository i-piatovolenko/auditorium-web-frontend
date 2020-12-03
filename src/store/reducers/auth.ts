import { SET_IS_LOGGED } from "../actions";
import {AuthActions, Me, userTypes} from "../types";

const initialState: Me = {
  id: 0,
  token: "",
  email: "",
  password: "",
  firstName: "",
  patronymic: "",
  lastName: "",
  type: userTypes.OTHER,
  phoneNumber: "",
  extraPhoneNumbers: "",
  department: "",
  isLogged: false,
};

const auth = (state = initialState, action: AuthActions): Me => {
  switch (action.type) {
    case SET_IS_LOGGED: {
      return { ...state, isLogged: action.isLogged };
    }
    default:
      return state;
  }
};

export default auth;

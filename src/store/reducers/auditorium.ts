import { AuditoriumActions, AuditoriumState } from "../types";
import { SET_SHOW_USER_POPUP } from "../actions";

const initialState: AuditoriumState = {
  showUserPopup: false,
};

let auditorium = (
  state = initialState,
  action: AuditoriumActions
): AuditoriumState => {
  switch (action.type) {
    case SET_SHOW_USER_POPUP:
      return { ...state, showUserPopup: action.isShown };
    default:
      return state;
  }
};

export default auditorium;

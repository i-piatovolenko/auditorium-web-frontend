import {
  FREE_CLASSROOM,
  OCCUPY_CLASSROOM,
  SET_CLASSROOMS,
  SET_CLASSROOMS_FILTER,
  SET_DISABLED_BUTTON,
  SET_IS_FETCHING,
  SET_MODAL_VISIBLE,
  SET_UNTIL_VALUE,
  SET_USER_ID_VALUE,
} from "../actions";
import { ClassroomsActions, ClassroomsState, userTypes } from "../types";
import { HOUR } from "../../lib/constants";

const initialState: ClassroomsState = {
  classrooms: [
    {
      id: 0,
      name: "",
      chair: "",
      special: "",
      floor: 1,
      isWing: false,
      description: "",
      occupied: {
        user: {
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
        until: 0,
      },
      instruments: [],
      comments: [],
      disabled: {},
      schedule: [],
    },
  ],
  userIdValue: 0,
  untilValue: HOUR,
  isFetching: false,
  disabledButton: true,
  classroomsFilter: "ALL",
  modalVisible: false,
};

let classrooms = (
  state = initialState,
  action: ClassroomsActions
): ClassroomsState => {
  switch (action.type) {
    case SET_CLASSROOMS:
      return { ...state, classrooms: action.classrooms };
    case FREE_CLASSROOM: {
      return {
        ...state,
        classrooms: state.classrooms.map((cl) => {
          if (cl.name === action.classroomName) {
            return { ...cl, occupied: null };
          } else {
            return cl;
          }
        }),
      };
    }
    case OCCUPY_CLASSROOM: {
      return {
        ...state,
        classrooms: state.classrooms.map((cl) => {
          if (cl.name === action.classroomName) {
            return { ...cl, occupied: action.occupied };
          } else {
            return cl;
          }
        }),
      };
    }
    case SET_USER_ID_VALUE:
      return { ...state, userIdValue: action.value };
    case SET_UNTIL_VALUE:
      return { ...state, untilValue: action.value };
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.value };
    case SET_DISABLED_BUTTON:
      return { ...state, disabledButton: action.value };
    case SET_CLASSROOMS_FILTER: {
      return { ...state, classroomsFilter: action.filter };
    }
    case SET_MODAL_VISIBLE: {
      return {...state, modalVisible: action.value}
    }
    default:
      return state;
  }
};

export default classrooms;

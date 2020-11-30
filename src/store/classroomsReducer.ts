import {gql} from '@apollo/client';
import {client} from "../index";

const SET_FETCHED_CLASSROOMS = 'SET_FETCHED_CLASSROOMS';
const FREE_CLASSROOM = 'FREE_CLASSROOM';
const OCCUPY_CLASSROOM = 'OCCUPY_CLASSROOM';
const SET_USER_ID_VALUE = 'SET_USER_ID_VALUE';
const SET_UNTIL_VALUE = 'SET_UNTIL_VALUE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_DISABLED_BUTTON = 'SET_DISABLED_BUTTON';

const initialState = {
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
                    firstName: "",
                    lastName: "",
                    type: "",
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
    untilValue: 3600000,
    isFetching: false,
    disabledButton: true,
}

let classroomsReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case SET_FETCHED_CLASSROOMS: return {...state, classrooms: action.classrooms};
        case FREE_CLASSROOM: {
            let classroomsUpdated = state.classrooms.map(cl => {
                if (cl.name === action.name) {
                    return ({...cl, occupied: null})
                } else {
                    return cl
                }
            });
            return {...state, classrooms: classroomsUpdated}
        }
        case OCCUPY_CLASSROOM: {
            let classroomsOccupied = state.classrooms.map(cl => {
                if (cl.name === action.name) {
                    return ({...cl, occupied: action.occupied})
                } else {
                    return cl
                }
            });
            return {...state, classrooms: classroomsOccupied}
        }
        case SET_USER_ID_VALUE: return {...state, userIdValue: action.value};
        case SET_UNTIL_VALUE: return {...state, untilValue: action.value};
        case SET_IS_FETCHING: return {...state, isFetching: action.value};
        case SET_DISABLED_BUTTON: return {...state, disabledButton: action.value};
        default:
            return state;
    };
};

export const setFetchedClassroomsAC = (classrooms: any) => ({type: SET_FETCHED_CLASSROOMS, classrooms})
export const fetchClassroomsTC = () => (dispatch: any) => {
    dispatch(setIsFetchingAC(true))
    //Handle error!!!
    client
    .query({
        query: gql`
            query {
                classrooms {
                    id
                    name
                    chair
                    special
                    isWing
                    description
                    occupied {
                        user {
                            firstName
                            lastName
                            type
                        }
                        until
                    }
                    instruments {
                        id
                        type
                        name
                        rate
                    }
                    schedule(date: "2020-12-17T03:24:00") {
                        user {
                            lastName
                        }
                        from
                        to
                        activity
                    }
                }
            }
        `
    })
    .then(result => {
        dispatch(setFetchedClassroomsAC(result.data.classrooms));
        dispatch(setIsFetchingAC(false));
    });
};

export const freeClassroomAC = (name: any) => ({type: FREE_CLASSROOM, name});
export const occupyClassroomAC = (occupied: any, name: any) => ({type: OCCUPY_CLASSROOM, name, occupied});
export const setUserIdValueAC = (value: any) => ({type: SET_USER_ID_VALUE, value});
export const setUntilValueAC = (value: any) => ({type: SET_UNTIL_VALUE, value});
export const setIsFetchingAC = (value: any) => ({type: SET_IS_FETCHING, value});
export const setDisabledButtonAC = (value: any) => ({type: SET_DISABLED_BUTTON, value});
export default classroomsReducer;
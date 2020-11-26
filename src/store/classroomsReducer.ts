import { gql } from '@apollo/client';
import {client} from "../index";

const SET_FETCHED_CLASSROOMS = 'SET_FETCHED_CLASSROOMS';

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
    ]
}
export type InitialStateType = typeof initialState;

let classroomsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_FETCHED_CLASSROOMS: return {...state, classrooms: action.classrooms};
        default:
            return state;
    };
};

export const setFetchedClassroomsAC = (classrooms: InitialStateType) => ({type: SET_FETCHED_CLASSROOMS, classrooms})
export const fetchClassroomsTC = () => (dispatch: any) => {
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
                }
            }
        `
    })
    .then(result => {
        dispatch(setFetchedClassroomsAC(result.data.classrooms));
    });
}

export default classroomsReducer;
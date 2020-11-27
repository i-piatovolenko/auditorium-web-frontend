import {client} from "../index";
import {gql} from "@apollo/client";

const SET_FETCHED_USERS = 'SET_FETCHED_USERS';

const initialState = {
    users: [
        {
            id: 0,
            firstName: "",
            patronymic: "",
            lastName: "",
            type: "",
            department: "",
        },
    ]
}

let usersReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case SET_FETCHED_USERS: {
            return {...state, users: action.users}
        }
        default:
            return state;
    };
};

export const setFetchedUsersAC = (users: any) => ({type: SET_FETCHED_USERS, users})
export const fetchUsersTC = () => (dispatch: any) => {
    //Handle error!!!
    client
    .query({
        query: gql`
            query {
                users {
                    id
                    firstName
                    patronymic
                    lastName
                    type
                    department
                }
            }
        `
    })
    .then(result => {
        dispatch(setFetchedUsersAC(result.data.users));
    });
}

export default usersReducer;
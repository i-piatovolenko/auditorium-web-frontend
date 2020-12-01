import {getRegister} from "../api/queries";

const SET_FETCHED_REGISTER = 'SET_FETCHED_REGISTER';

const initialState = {
    register: [
        {
            id: "0",
            user: {
                lastName: "LastName",
            },
            classroom: {
                name: "1",
            },
            start: "1",
            end: "1",
        },
    ],
};

const registerReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_FETCHED_REGISTER: return {...state, register: action.register};
        default: return state;
    }
}
export const setFetchedRegister = (register: any) => ({type: SET_FETCHED_REGISTER, register});
export const fetchRegistersTC = () => async (dispatch: any) => {
    let register = await getRegister(String(new Date));
    dispatch(setFetchedRegister(register.data.register))
};

export default registerReducer;
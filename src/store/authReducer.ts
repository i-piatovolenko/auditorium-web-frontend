const SET_LOGGED = 'SET_LOGGED';

const initialState = {
    id: "",
    firstName: "",
    patronymic: "",
    lastName: "",
    token: "",
    email: "",
    phoneNumber: "",
    extraPhoneNumbers: "",
    password: "",
    type: "",
    department: "",
    isLogged: false
};

let authReducer = (state = initialState, action:any) => {
    switch(action.type) {
        case SET_LOGGED: {
            return {...state, isLogged: action.value}
        };
        default: return state;
    };
};

export const setLoggedAC = (value: boolean) => ({type:SET_LOGGED, value});

export default authReducer;
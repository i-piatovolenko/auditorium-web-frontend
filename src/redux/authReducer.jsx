const SET_LOGGED = 'SET_LOGGED'

let initialState = {
    logged: false
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED: return {...state, logged: action.login==="admin"&&action.password==="admin"?true:false}
        default:
            return state;
    }
}

export const setLogged = (login, password) => ({type: SET_LOGGED, login, password})

export default authReducer;
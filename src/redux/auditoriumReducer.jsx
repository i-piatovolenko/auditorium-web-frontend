import * as data from './rooms.json'

const SET_OCCUPATION_DATA = 'SET_OCCUPATION_DATA'
const DELETE_OCCUPANT = 'DELETE_OCCUPANT'
const SET_BLURRED = 'SET_BLURRED'
const SET_NOTIFICATION_SHOWN = 'SET_NOTIFICATION_SHOWN'

let initialState = {
    rooms: data.rooms,
    blurred: true,
    notificationShown: false
}

let auditoriumReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OCCUPATION_DATA: {
            let item = {
            "id": state.rooms[action.room].id,
            "name": state.rooms[action.room].name,
            "isSpecial": { ...state.rooms[action.room].isSpecial},
            "occupied": {"value": true, "by": {"name": action.name, "type": action.userType}, "until": action.until},
            "isWing": state.rooms[action.room].isWing,
            "instruments": [...state.rooms[action.room].instruments],
            "rate": state.rooms[action.room].rate,
            "description": state.rooms[action.room].description,
            "comments": [...state.rooms[action.room].comments]
        }
            state.rooms.splice(action.room, 1, item)
            return {...state, rooms: [...state.rooms]}
        }
        case DELETE_OCCUPANT: {
            let item = {
                "id": state.rooms[action.room].id,
                "name": state.rooms[action.room].name,
                "isSpecial": { ...state.rooms[action.room].isSpecial},
                "occupied": {"value": false, "by": {"name": "", "type": ""}, "until": ""},
                "isWing": state.rooms[action.room].isWing,
                "instruments": [...state.rooms[action.room].instruments],
                "rate": state.rooms[action.room].rate,
                "description": state.rooms[action.room].description,
                "comments": [...state.rooms[action.room].comments]
            }
        state.rooms.splice(action.room, 1, item)
            return {...state, rooms: [...state.rooms]}
        }
        case SET_BLURRED: return {...state, blurred: action.value}
        case SET_NOTIFICATION_SHOWN: return {...state, notificationShown: action.value}
        default:
            return state;
    }
}

export const setOccupationData = (room, name, userType, until) => ({type: SET_OCCUPATION_DATA, room, name, userType, until})
export const deleteOccupant = (room) => ({type: DELETE_OCCUPANT, room})
export const setBlurred = (value) => ({type: SET_BLURRED, value})
export const setNotificationShown = (value) => ({type: SET_NOTIFICATION_SHOWN, value})

export default auditoriumReducer;
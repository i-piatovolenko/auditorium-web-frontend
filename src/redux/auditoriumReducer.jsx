import * as data from './rooms.json'
import {gql} from '@apollo/client';
import {client} from "../index";

const SET_OCCUPATION_DATA = 'SET_OCCUPATION_DATA'
const DELETE_OCCUPANT = 'DELETE_OCCUPANT'
const SET_BLURRED = 'SET_BLURRED'
const SET_NOTIFICATION_SHOWN = 'SET_NOTIFICATION_SHOWN'
const SET_APOLLO_DATA = 'SET_APOLLO_DATA'




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
        case SET_APOLLO_DATA: return {...state, rooms: action.rooms.map(room=> {
                return {
                    "id": room.id,
                    "name": room.name,
                    "isSpecial": {
                        "value": room.special != null ? true : false,
                        "type": room.chair
                    },
                    "occupied": room.occupied != null ? {
                        "value": true,
                        "by": {
                            "name": room.occupied.user.firstName + " " + room.occupied.user.lastName,
                            "type": "Студент"
                        },
                        "until": ""
                    } : {
                        "value": false,
                        "by": {
                            "name": "",
                            "type": ""
                        },
                        "until": ""
                    },
                    "isWing": room.isWing,
                    "instruments": [],
                    "rate": 0,
                    "description": room.description,
                    "comments": []
                }
            })}
        default:
            return state;
    }
}

export const setOccupationData = (room, name, userType, until) => ({type: SET_OCCUPATION_DATA, room, name, userType, until})
export const deleteOccupant = (room) => ({type: DELETE_OCCUPANT, room})
export const setApolloDataAC = (rooms) => ({type: SET_APOLLO_DATA, rooms})
export const setBlurred = (value) => ({type: SET_BLURRED, value})
export const setNotificationShown = (value) => ({type: SET_NOTIFICATION_SHOWN, value})
export const setApolloData = () => (dispatch) => {
    client
    .query({
        query: gql`
            query {
                rooms: classrooms {
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
                        }
                        until
                    }
                }
            }
        `
    })
    .then(result => dispatch(setApolloDataAC(result.data.rooms)));
}

export default auditoriumReducer;
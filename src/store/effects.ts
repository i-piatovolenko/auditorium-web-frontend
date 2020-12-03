import {
    getClassrooms,
    getRegister,
    getUsers
} from '../api/queries';
import {
    setClassrooms,
    setRegister,
    setUsers,
    setIsFetching
} from './actions';

//classrooms

export const fetchClassroomsTC = () => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    let classrooms = await getClassrooms();
    dispatch(setClassrooms(classrooms.data.classrooms));
    dispatch(setIsFetching(false));
};

//auth

export const fetchRegistersTC = () => async (dispatch: any) => {
    let register = await getRegister(String(new Date()));
    dispatch(setRegister(register.data.register))
};

//users

export const fetchUsersTC = () => async (dispatch: any) => {
    let users = await getUsers()
    dispatch(setUsers(users.data.users));
}
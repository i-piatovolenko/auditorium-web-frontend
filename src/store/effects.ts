import { getClassrooms, getRegister, getUsers } from "../api/queries";
import {
  setClassrooms,
  setRegister,
  setUsers,
  setIsFetching,
  occupyClassroomAC,
  setDisabledButton,
  setModalVisible,
  freeClassroomAC,
} from "./actions";

//classrooms

export const fetchClassroomsTC = () => async (dispatch: any) => {
  dispatch(setIsFetching(true));
  try {
    let classrooms = await getClassrooms();
    dispatch(setClassrooms(classrooms.data.classrooms));
    dispatch(setIsFetching(false));
  } catch (e) {
    console.log(e);
  }
};

export const occupyClassroomTC = (
  classroomName: string,
  userId: number,
  untilValue: number,
  occupyClassroom: any
) => async (dispatch: any) => {
  try {
    let result = await occupyClassroom({
      variables: {
        input: {
          classroomName: String(classroomName),
          userId: userId,
          until: new Date(new Date().getTime() + untilValue),
        },
      },
    });
    let occupiedData = result.data.occupyClassroom.classroom.occupied;
    dispatch(occupyClassroomAC(occupiedData, classroomName));
    dispatch(setDisabledButton(true));
    dispatch(setModalVisible(false));
  } catch (e) {
    console.log(e);
  }
};

export const freeClassroomTC = (
  classroomName: string,
  freeClassroom: any,
  closeWindow: boolean
) => async (dispatch: any) => {
  try {
    await freeClassroom({
      variables: {
        input: {
          classroomName: classroomName,
        },
      },
    });
    dispatch(fetchClassroomsTC);
    dispatch(freeClassroomAC(classroomName));
    dispatch(setDisabledButton(true));
    dispatch(setModalVisible(!closeWindow));
  } catch (e) {
    console.log(e);
  }
};

//register

export const fetchRegistersTC = () => async (dispatch: any) => {
  let register = await getRegister(String(new Date()));
  dispatch(setRegister(register.data.register));
};

//users

export const fetchUsersTC = () => async (dispatch: any) => {
  let users = await getUsers();
  dispatch(setUsers(users.data.users));
};

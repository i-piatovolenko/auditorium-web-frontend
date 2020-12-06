import React, { useState } from "react";
import { Button } from "antd";
import {
  freeClassroomAC,
  occupyClassroomAC,
  setDisabledButton, setModalVisible,
} from "../../../../store/actions";

import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { FREE_CLASSROOM, OCCUPY_CLASSROOM } from "../../../../api/mutations";
import { fetchClassroomsTC } from "../../../../store/effects";
import ClassroomsGridCell from "./Cell";
import { userTypeColors, userTypesUA } from "../../../../lib/constants";

const ClassroomsGridCellContainer = (props: any) => {
  let [visible, setVisible] = useState(false);
  // @ts-ignore
  let userId = useSelector((state) => state.classroomsReducer.userIdValue);
  // @ts-ignore
  let disabledButton = useSelector((state) => state.classroomsReducer.disabledButton
  );
  // @ts-ignore
  let untilValue = useSelector((state) => state.classroomsReducer.untilValue);
  const isOccupied = props.classroom.occupied != null ? true : false;
  const untilDate = new Date(isOccupied ? props.classroom.occupied.until : "0");
  const untilTime = untilDate.getHours() + ":" + untilDate.getMinutes();
  const userType = isOccupied ? props.classroom.occupied.user.type : "";
  // @ts-ignore
  let userTypeUA = userTypesUA[userType];
  // @ts-ignore
  let initialsColor = userTypeColors[userType];
  let handleOk = () => {
    setVisible(false);
    dispatch(setModalVisible(false));
    dispatch(setDisabledButton(true));
  };
  let handleCancel = () => {
    dispatch(setModalVisible(false));
    setVisible(false);
    dispatch(setDisabledButton(true));
  };
  const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM);
  const [freeClassroom] = useMutation(FREE_CLASSROOM);

  const dispatch = useDispatch();
  let footerButtonOk = isOccupied ? (
    <>
      <Button key="submit" type="primary" onClick={() => {
        freeClassroom({
          variables: {
            input: {
              classroomName: props.classroom.name,
            },
          },
        }).then((r) => {
          dispatch(fetchClassroomsTC);
          dispatch(freeClassroomAC(props.classroom.name));
          dispatch(setDisabledButton(true));
        });
      }}>
        Передати аудиторію
      </Button>
      <Button
        key="submit"
        type="primary"
        danger
        onClick={() => {
          freeClassroom({
            variables: {
              input: {
                classroomName: props.classroom.name,
              },
            },
          }).then((r) => {
            dispatch(fetchClassroomsTC);
            dispatch(freeClassroomAC(props.classroom.name));
            dispatch(setDisabledButton(true));
            dispatch(setModalVisible(false));
            setVisible(false);
          });
        }}
      >
        Звільнити аудиторію
      </Button>
    </>
  ) : (
    <Button
      disabled={disabledButton}
      key="submit"
      type="primary"
      onClick={() => {
        occupyClassroom({
          variables: {
            input: {
              classroomName: String(props.classroom.name),
              userId: userId,
              until: new Date(new Date().getTime() + untilValue),
            },
          },
        }).then((r) => {
          let occupiedData = r.data.occupyClassroom.classroom.occupied;
          dispatch(occupyClassroomAC(occupiedData, props.classroom.name));
          dispatch(setDisabledButton(true));
          dispatch(setModalVisible(false));
          setVisible(false);
        });
      }}
    >
      Записати в аудиторію
    </Button>
  );
  return (
    <ClassroomsGridCell
      visible={visible}
      setVisible={setVisible}
      initialsColor={initialsColor}
      userTypeUA={userTypeUA}
      userType={userType}
      untilTime={untilTime}
      untilDate={untilDate}
      isOccupied={isOccupied}
      untilValue={untilValue}
      disabledButton={disabledButton}
      userId={userId}
      footerButtonOk={footerButtonOk}
      handleOk={handleOk}
      handleCancel={handleCancel}
      classroom={props.classroom}
    />
  );
};

export default ClassroomsGridCellContainer;

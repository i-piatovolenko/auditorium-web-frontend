import React, {useEffect} from "react";
import ClassroomsGridElement from "./Element";
import { userTypeColors, userTypesUA } from "../../../../../lib/constants";
import { Classroom, userTypes } from "../../../../../store/types";
import { getTimeHHMM } from "../../../../../lib/lib";
import {setModalVisible} from "../../../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {AuditoriumStateType} from "../../../../../store/store";

type Props = {
  classroom: Classroom;
  key: number;
};

const ClassroomsGridElementContainer: React.FC<Props> = ({ classroom }) => {
  const { occupied } = classroom;
  let untilDate = new Date(occupied ? occupied.until : 0);
  const untilTime = getTimeHHMM(untilDate);
  const userType = occupied != null ? occupied.user?.type : "";
  const userTypeUA = userTypesUA[userType as userTypes];
  const userTypeColor = userTypeColors[userType as userTypes];
  const visibility = useSelector<AuditoriumStateType, boolean>((state) => {
    return state.classroomsReducer.modalVisible;
  });
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setModalVisible(true))
  }
  useEffect(() => {
    visibility
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "scroll");
  });
  return (
    <ClassroomsGridElement
      userTypeColor={userTypeColor}
      userTypeUA={userTypeUA}
      untilTime={untilTime}
      classroom={classroom}
      onClick={onClick}
    />
  );
};

export default ClassroomsGridElementContainer;

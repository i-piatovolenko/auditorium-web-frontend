import React from "react";
import ClassroomsGridCell from "./Cell";
import { userTypeColors, userTypesUA } from "../../../../lib/constants";

const ClassroomsGridCellContainer = (props: any) => {
  const isOccupied = props.classroom.occupied != null ? true : false;
  const untilDate = new Date(isOccupied ? props.classroom.occupied.until : "0");
  const untilTime = untilDate.getHours() + ":" + untilDate.getMinutes();
  const userType = isOccupied ? props.classroom.occupied.user.type : "";
  // @ts-ignore
  let userTypeUA = userTypesUA[userType];
  // @ts-ignore
  let initialsColor = userTypeColors[userType];

  return (
    <ClassroomsGridCell
      initialsColor={initialsColor}
      userTypeUA={userTypeUA}
      userType={userType}
      untilTime={untilTime}
      untilDate={untilDate}
      isOccupied={isOccupied}
      classroom={props.classroom}
    />
  );
};

export default ClassroomsGridCellContainer;

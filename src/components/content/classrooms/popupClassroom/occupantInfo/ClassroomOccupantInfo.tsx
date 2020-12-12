import React from "react";
import { Descriptions } from "antd";

const ClassroomOccupantInfo = ({ classroom }: any) => {
  let occupiedUntil = new Date(classroom.occupied.until);

  return (
    <div>
      <Descriptions size="small" title="Зайнято:" bordered column={1}>
        <Descriptions.Item label="До:">
          {occupiedUntil.getHours() + ":" + occupiedUntil.getMinutes()}
        </Descriptions.Item>
        <Descriptions.Item label="Ким:">
          {classroom.occupied.user.type +
            " | " +
            classroom.occupied.user.firstName +
            " " +
            classroom.occupied.user.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Тел.:">Немає</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default ClassroomOccupantInfo;

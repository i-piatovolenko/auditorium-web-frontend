import React from "react";
import { Descriptions } from "antd";
import { Classroom } from "../../../../../store/types";
import ClassroomsInstruments from "../../classroomInstruments/ClassroomInstruments";
import ClassroomSchedule from "../classroomSchedule/ClassroomSchedule";

type Props = {
  classroom: Classroom;
};

const ClassroomInfo: React.FC<Props> = ({ classroom }) => {
  const { description, special, chair, instruments, schedule } = classroom;
  return (
    <div>
      <Descriptions size="small" title="Інформація:" bordered column={1}>
        <Descriptions.Item label="Опис:">{description}</Descriptions.Item>
        <Descriptions.Item label="Спец. аудиторія:">
          {special ? special : "Ні"}
        </Descriptions.Item>
        <Descriptions.Item
          label="Кафедра:"
        >
          {chair ? chair : "Немає"}
        </Descriptions.Item>
      </Descriptions>
        <ClassroomSchedule schedule={schedule} />
      <ClassroomsInstruments
        instruments={instruments}
        style={{ paddingTop: 10 }}
      />
    </div>
  );
};
export default ClassroomInfo;

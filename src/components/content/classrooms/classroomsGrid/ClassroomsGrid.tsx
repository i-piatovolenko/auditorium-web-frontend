import React from "react";
import ClassroomsGridElement from "./element/ElementContainer";
import styles from "./classrooms.module.css";
import { Classroom } from "../../../../store/types";

type Props = {
  classroomsFilter: (classroom: Classroom) => boolean;
  classrooms: Array<Classroom>;
};

const ClassroomsGrid: React.FC<Props> = ({ classrooms, classroomsFilter }) => {
  return (
    <div className={styles.classroomsGrid}>
      {classrooms
        .filter((classroom: Classroom) => classroomsFilter(classroom))
        .map((classroom: Classroom) => (
          <ClassroomsGridElement key={classroom.id} classroom={classroom} />
        ))}
    </div>
  );
};

export default ClassroomsGrid;

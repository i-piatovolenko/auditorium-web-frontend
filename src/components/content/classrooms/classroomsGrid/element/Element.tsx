import React from "react";
import styles from "./element.module.css";
import { NavLink } from "react-router-dom";
import pianoSpecialIcon from "../../../../../assets/specialPiano.png";
import { getPossiblyOccupied } from "../../../../../lib/lib";
import { Classroom } from "../../../../../store/types";
import ClassroomsGridElementHeader from "./elementHeader/ElementHeader";
import ClassroomsGridElementMessage from "./elementMessage/ElementMessage";
import ClassroomsInstruments from "../../classroomInstruments/ClassroomInstruments";

type Props = {
  userTypeColor: string;
  userTypeUA: string;
  untilTime: string;
  classroom: Classroom;
  onClick: () => void;
};

const ClassroomsGridElement: React.FC<Props> = ({
  classroom,
  userTypeColor,
  untilTime,
  userTypeUA,
  onClick,
}) => {

  const { schedule, special, chair, name, instruments, occupied } = classroom;
  const isPossiblyOccupied = getPossiblyOccupied(schedule);
  const headerProps = {
    chair: chair,
    name: name,
    occupied: occupied,
    userTypeUA: userTypeUA,
    userTypeColor: userTypeColor,
  };
  const messageProps = {
    occupied: occupied,
    isPossiblyOccupied: isPossiblyOccupied,
    untilTime: untilTime,
  };

  return (
    <NavLink to={`/classrooms/${name}`}>
      <div
        onClick={onClick}
        className={styles.classroom}
        style={occupied === null ? { backgroundColor: "#6bff98" } : {}}
      >
        {special === "piano" ? (
          <img
            className={styles.specIcon}
            src={pianoSpecialIcon}
            alt="Спеціалізована фортепіанна аудиторія"
          />
        ) : null}
        <ClassroomsGridElementHeader {...headerProps} />
        <ClassroomsGridElementMessage {...messageProps} />
        <ClassroomsInstruments instruments={instruments} />
      </div>
    </NavLink>
  );
};

export default ClassroomsGridElement;

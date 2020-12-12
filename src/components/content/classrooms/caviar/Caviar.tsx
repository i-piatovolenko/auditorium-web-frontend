import React from "react";
import styles from "./caviar.module.css";
import { Classroom } from "../../../../store/types";
import { setModalVisible } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

type Props = {
  classroomsFilter: (classroom: Classroom) => boolean;
  classrooms: Array<Classroom>;
};

const Caviar: React.FC<Props> = ({ classroomsFilter, classrooms }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setModalVisible(true));
  };

  return (
    <ul className={styles.caviarClassroomsList}>
      {classrooms
        .filter((classroom) => classroomsFilter(classroom))
        .map(({ name, id, occupied }: Classroom) => (
          <NavLink key={id} to={`/classrooms/${name}`}>
            <li
              key={id}
              onClick={onClick}
              className={occupied ? "" : styles.released}
            >
              {name}
            </li>
          </NavLink>
        ))}
    </ul>
  );
};

export default Caviar;

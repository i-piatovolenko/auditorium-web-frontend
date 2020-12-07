import react from "react";
import styles from "./shortlist.module.css";
import { Classroom } from "../../../../store/types";
import {setModalVisible} from "../../../../store/actions";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import React from "react";

type Props = {
  filter: (cl: Classroom) => boolean;
  classrooms: Array<Classroom>;
};

const ShortList: React.FC<Props> = ({ filter, classrooms }) => {
  let dispatch = useDispatch();
  return (

    <ul className={styles.roomList}>
      {classrooms
        .filter((cl) => filter(cl))
        .map((cl: any) => (
            <NavLink to={`/classrooms/${cl.name}`}>
          <li onClick={() => {
            dispatch(setModalVisible(true))
          }} className={cl.occupied != null ? "" : styles.released}>
            {cl.name}
          </li>
            </NavLink>
        ))}
    </ul>

  );
};

export default ShortList;

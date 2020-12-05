import react from "react";
import styles from "./shortlist.module.css";

const ShortList = (props: any) => {
  return (
    <ul className={styles.roomList}>
      {props.classrooms.map((cl: any) => (
        <li className={cl.occupied!=null ? "" : styles.released}>
          {cl.name}
        </li>
      ))}
    </ul>
  );
};

export default ShortList;

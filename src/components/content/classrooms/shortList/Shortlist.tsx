import react from "react";
import styles from "./shortlist.module.css";
import { Classroom } from "../../../../store/types";

type Props = {
  filter: (cl: Classroom) => boolean;
  classrooms: Array<Classroom>;
};

const ShortList: React.FC<Props> = ({ filter, classrooms }) => {
  return (
    <ul className={styles.roomList}>
      {classrooms
        .filter((cl) => filter(cl))
        .map((cl: any) => (
          <li className={cl.occupied != null ? "" : styles.released}>
            {cl.name}
          </li>
        ))}
    </ul>
  );
};

export default ShortList;

import React from "react";
import { Occupied } from "../../../../../../store/types";
import styles from "./elementMessage.module.css";
import { WarningOutlined } from "@ant-design/icons/lib";

type Props = {
  isPossiblyOccupied: boolean;
  untilTime: string;
  occupied: Occupied | null;
};

const ClassroomsGridElementMessage: React.FC<Props> = ({
  isPossiblyOccupied,
  untilTime,
  occupied,
}) => {
  return (
    <div className={styles.desc}>
      {occupied ? (
        <p className={styles.occupiedTime}>
          Зайнято до: <b>{untilTime}</b>
        </p>
      ) : !isPossiblyOccupied ? (
        <p
          className={[styles.occupiedTime, styles.warning].join(" ")}
        >
          <WarningOutlined
            className={styles.warning}
          />
          &nbsp;Зайнято за розкладом
        </p>
      ) : null}
    </div>
  );
};

export default ClassroomsGridElementMessage;

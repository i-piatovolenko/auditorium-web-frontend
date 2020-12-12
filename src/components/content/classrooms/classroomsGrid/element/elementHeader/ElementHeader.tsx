import React from "react";
import { Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import styles from "../element.module.css";
import { Occupied } from "../../../../../../store/types";

type Props = {
  chair: string | null;
  name: string;
  occupied: Occupied | null;
  userTypeUA: string;
  userTypeColor: string;
};

const ClassroomsGridElementHeader: React.FC<Props> = ({
  chair,
  name,
  occupied,
  userTypeUA,
  userTypeColor,
}) => {
  const occupantTooltipBody =
    occupied
      ? occupied.user?.firstName +
        " " +
        occupied.user?.lastName +
        " — " +
        userTypeUA
      : null;
  const occupantFullName =
    occupied
      ? occupied.user?.firstName.charAt(0) + ". " + occupied.user?.lastName
      : null;

  return (
    <div className={styles.elementTitle}>
      <Tooltip title={chair}>
        <span className={styles.classroomName}>
          {name + " "}
          {chair ? (
            <FontAwesomeIcon
              style={{
                color: "#ffbf00",
                fontSize: "18px",
                marginBottom: "6px",
                marginRight: "2px",
              }}
              icon={faCrown}
            />
          ) : null}
        </span>
      </Tooltip>
      <Tooltip title={occupantTooltipBody}>
        <span
          className={styles.occupantName}
          style={{ backgroundColor: userTypeColor }}
        >
          {occupantFullName}
        </span>
      </Tooltip>
    </div>
  );
};

export default ClassroomsGridElementHeader;

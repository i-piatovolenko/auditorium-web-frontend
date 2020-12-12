import React from "react";
import styles from "./classroomSchedule.module.css";
import { ScheduleUnit } from "../../../../../store/types";
import { getScheduleUnitRowLength } from "../../../../../lib/lib";
import { Tooltip } from "antd";

type Props = {
  schedule: Array<ScheduleUnit>;
};

const ClassroomSchedule: React.FC<Props> = ({ schedule }) => {
  let scheduleUnitRowLength = getScheduleUnitRowLength(schedule, "fr");
  return (
    <>
      <h3>Розклад на сьогодні: </h3>
      <div
        className={styles.scheduleTimeline}
        style={{ gridTemplateColumns: scheduleUnitRowLength }}
      >
        {schedule.map((scheduleUnit: ScheduleUnit) => {
          let { user, from, to } = scheduleUnit;
          let unitInfo = [user.lastName, "— з", from, "до", to].join(" ");
          return (
            <Tooltip title={unitInfo}>
              <div>{unitInfo}</div>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};

export default ClassroomSchedule;

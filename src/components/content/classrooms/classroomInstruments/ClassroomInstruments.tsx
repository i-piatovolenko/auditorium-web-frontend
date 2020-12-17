import React from "react";
import uprightPianoIcon from "../../../../assets/uprightPiano.png";
import grandPianoIcon from "../../../../assets/grandPiano.png";
import { StarFilled } from "@ant-design/icons/lib";
import styles from "../classroomsGrid/element/element.module.css";
import { Instrument } from "../../../../store/types";

type Props = {
  instruments: Array<Instrument>;
};

const ClassroomsInstruments: React.FC<Props> = ({ instruments }) => {
  return (
    <div className={styles.instruments}>
      <ul>
        {instruments.map(({ id, type, name, rate }: Instrument) => (
          <li key={id}>
            <img
              className={styles.instrumentIcon}
              src={type === "UpRightPiano" ? uprightPianoIcon : grandPianoIcon}
              alt="piano"
            />
            {name} <StarFilled style={{ color: "#ffbf00" }} /> {rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomsInstruments;

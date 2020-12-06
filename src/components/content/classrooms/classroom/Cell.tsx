import React from "react";
import styles from "./classroom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Button, Modal, Tooltip } from "antd";
import Occupied from "./overview/occupied/Occupied";
import Free from "./overview/free/Free";
import pianoSpecialIcon from "../../../../assets/specialPiano.png";
import grandPianoIcon from "../../../../assets/grandPiano.png";
import uprightPianoIcon from "../../../../assets/uprightPiano.png";
import { StarFilled } from "@ant-design/icons/lib";

const ClassroomsGridCell = (props: any) => {
  return (
    <>
      <NavLink to={`/classrooms/${props.classroom.name}`}>
        <div
          onClick={() => props.setVisible(true)}
          className={styles.classroom}
          style={!props.isOccupied ? { backgroundColor: "#6bff98" } : {}}
        >
          {props.classroom.special === "piano" ? (
            <img
              className={styles.specIcon}
              src={pianoSpecialIcon}
              alt="Спеціалізована фортепіанна аудиторія"
            />
          ) : null}
          <div className={styles.cellTitle}>
            <Tooltip title={props.classroom.chair}>
              <span className={styles.classroomName}>
                {props.classroom.name}{" "}
                {props.classroom.chair != null ? (
                  <FontAwesomeIcon
                    style={{
                      color: "#ffbf00",
                      fontSize: "18px",
                      marginBottom: "6px",
                      marginRight: "2px",
                    }}
                    icon={faCrown}
                  />
                ) : (
                  ""
                )}
              </span>
            </Tooltip>
            <Tooltip
              title={
                props.isOccupied
                  ? props.classroom.occupied.user.firstName +
                    " " +
                    props.classroom.occupied.user.lastName +
                    " — " +
                    props.userTypeUA
                  : "Вільна аудиторія"
              }
            >
              <span
                className={styles.occupantName}
                style={{ backgroundColor: props.initialsColor }}
              >
                {props.isOccupied
                  ? props.classroom.occupied.user.firstName.charAt(0) +
                    ". " +
                    props.classroom.occupied.user.lastName
                  : null}
              </span>
            </Tooltip>
          </div>
          <div className={styles.desc}>
            {props.isOccupied ? (
              <p className={styles.occupiedTime}>
                Зайнято до: <b>{props.untilTime}</b>
              </p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.inst}>
            <ul>
              {props.classroom.instruments.map((instr: any) => (
                <li>
                  <img
                    className={styles.instrumentIcon}
                    src={
                      instr.type === "UpRightPiano"
                        ? uprightPianoIcon
                        : grandPianoIcon
                    }
                    alt="piano"
                  />
                  {instr.name} <StarFilled style={{ color: "#ffbf00" }} />{" "}
                  {instr.rate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </NavLink>
      <Modal
          destroyOnClose
        title={"Аудиторія №" + props.classroom.name}
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={[
          <Button key="back" onClick={props.handleCancel}>
            Закрити
          </Button>,
          props.footerButtonOk,
        ]}
        width={1000}
      >
        {props.isOccupied ? (
          <Occupied classroom={props.classroom} />
        ) : (
          <Free
            disabledButton={props.disabledButton}
            classroom={props.classroom}
          />
        )}
      </Modal>
      {/*<Expanded*/}
      {/*  isOccupied={props.isOccupied}*/}
      {/*  classroom={props.classroom}*/}
      {/*/>*/}
    </>
  );
};

export default ClassroomsGridCell;
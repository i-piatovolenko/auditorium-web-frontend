import React, { useState } from "react";import styles from "./classroom.module.css";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faCrown } from "@fortawesome/free-solid-svg-icons";import { NavLink } from "react-router-dom";import { Button, Modal } from "antd";import Occupied from "./overview/occupied/Occupied";import Free from "./overview/free/Free";import {  freeClassroomAC,  occupyClassroomAC,  setDisabledButton,} from "../../../../store/actions";import { useMutation } from "@apollo/client";import { useDispatch, useSelector } from "react-redux";import { FREE_CLASSROOM, OCCUPY_CLASSROOM } from "../../../../api/mutations";import { fetchClassroomsTC } from "../../../../store/effects";const ClassroomsGridCell = ({ classroom }: any) => {  // @ts-ignore  let userId = useSelector((state) => state.classroomsReducer.userIdValue);  // @ts-ignore  let disabledButton = useSelector((state) => state.classroomsReducer.disabledButton  );  // @ts-ignore  let untilValue = useSelector((state) => state.classroomsReducer.untilValue);  const isOccupied = classroom.occupied != null ? true : false;  const untilDate = new Date(isOccupied ? classroom.occupied.until : "0");  const untilTime = untilDate.getHours() + ":" + untilDate.getMinutes();  const userType = isOccupied ? classroom.occupied.user.type : "";  let userTypeUa;  let initialsColor;  switch (userType) {    case "TEACHER": {      initialsColor = "#ffa200";      userTypeUa = "Педагог";      break;    }    case "STUDENT": {      initialsColor = "#0090ff";      userTypeUa = "Студент";      break;    }    case "ADMINISTRATION": {      initialsColor = "#a80332";      userTypeUa = "Адміністрація";      break;    }    case "POST_GRADUATE": {      initialsColor = "#aa6b00";      userTypeUa = "Аспірантура/асистентура, тощо";      break;    }    case "CONCERTMASTER": {      initialsColor = "#ffa200";      userTypeUa = "Концертмейстер";      break;    }    case "ILLUSTRATOR": {      initialsColor = "#ffa200";      userTypeUa = "Іллюстратор";      break;    }    default: {      initialsColor = "#ffa200";      break;    }  }  let handleOk = () => {    setVisible(false);    dispatch(setDisabledButton(true));  };  let handleCancel = () => {    setVisible(false);    dispatch(setDisabledButton(true));  };  const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM);  const [freeClassroom] = useMutation(FREE_CLASSROOM);  let [visible, setVisible] = useState(false);  const dispatch = useDispatch();  let footerButtonOk = isOccupied ? (    <>      <Button key="submit" type="primary" onClick={() => {}}>        Передати аудиторію      </Button>      <Button        key="submit"        type="primary"        danger        onClick={() => {          freeClassroom({            variables: {              input: {                classroomName: classroom.name,              },            },          }).then((r) => {            dispatch(fetchClassroomsTC);            dispatch(freeClassroomAC(classroom.name));            dispatch(setDisabledButton(true));            setVisible(false);          });        }}      >        Звільнити аудиторію      </Button>    </>  ) : (    <Button      disabled={disabledButton}      key="submit"      type="primary"      onClick={() => {        occupyClassroom({          variables: {            input: {              classroomName: String(classroom.name),              userId: userId,              until: new Date(new Date().getTime() + untilValue),            },          },        }).then((r) => {          let occupiedData = r.data.occupyClassroom.classroom.occupied;          dispatch(occupyClassroomAC(occupiedData, classroom.name));          dispatch(setDisabledButton(true));          setVisible(false);        });      }}    >      Записати в аудиторію    </Button>  );  return (    <>      <NavLink to={`/classrooms/${classroom.name}`}>        <div          onClick={() => setVisible(true)}          className={styles.classroom}          style={!isOccupied ? { backgroundColor: "#6bff98" } : {}}        >          <div className={styles.num}>            <h1 title={classroom.chair}>              {classroom.name}{" "}              {classroom.chair != null ? (                <FontAwesomeIcon                  style={{ color: "#ffbf00", fontSize: "18px" }}                  icon={faCrown}                />              ) : (                ""              )}            </h1>          </div>          <div className={styles.init}>            <h1 style={{ backgroundColor: initialsColor }} title={userTypeUa}>              {isOccupied                ? classroom.occupied.user.firstName.charAt(0) +                  ". " +                  classroom.occupied.user.lastName                : ""}            </h1>          </div>          <div className={styles.spec}></div>          <div className={styles.desc}>            {isOccupied ? (              <p className={styles.occupiedTime}>                Зайнято до: <b>{untilTime}</b>              </p>            ) : (              ""            )}          </div>          <div className={styles.inst}>            <ul>              {classroom.instruments.map((instr: any) => (                <li>{instr.name + " " + instr.rate}</li>              ))}            </ul>          </div>        </div>      </NavLink>      <Modal        title={"Аудиторія №" + classroom.name}        visible={visible}        onOk={handleOk}        onCancel={handleCancel}        footer={[          <Button key="back" onClick={handleCancel}>            Закрити          </Button>,          footerButtonOk,        ]}        width={1000}      >        {isOccupied ? (          <Occupied classroom={classroom} />        ) : (          <Free disabledButton={disabledButton} classroom={classroom} />        )}      </Modal>    </>  );};export default ClassroomsGridCell;
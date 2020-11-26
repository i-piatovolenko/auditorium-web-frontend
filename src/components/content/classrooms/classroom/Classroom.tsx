import React, {useState} from 'react';
import styles from './classroom.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Overview from "./overview/Overview";
import {NavLink, Route, Switch} from "react-router-dom";

const Classroom = ({classroom}: any) => {

    let [visibleOverView, setVisibleOverView] = useState(false);

    const isOccupied = classroom.occupied!=null?true:false;
    const untilDate = new Date(isOccupied ? classroom.occupied.until : "0");
    const untilTime = untilDate.getHours() + ":" + untilDate.getMinutes();
    const userType = isOccupied?classroom.occupied.user.type:"";
    let userTypeUa;
    let initialsColor;
    switch (userType) {
        case "TEACHER": {
            initialsColor = "#ffa200";
            userTypeUa = "Педагог";
            break;
        }
        case "STUDENT": {
            initialsColor = "#0090ff";
            userTypeUa = "Студент";
            break;
        }
        case "ADMINISTRATION": {
            initialsColor = "#a80332";
            userTypeUa = "Адміністрація";
            break;
        }
        case "POST_GRADUATE": {
            initialsColor = "#aa6b00";
            userTypeUa = "Аспірантура/асистентура, тощо"
            break;
        }
        case "CONCERTMASTER": {
            initialsColor = "#ffa200";
            userTypeUa = "Концертмейстер";
            break;
        }
        case "ILLUSTRATOR": {
            initialsColor = "#ffa200";
            userTypeUa = "Іллюстратор";
            break;
        }
        default: {
            initialsColor = "#ffa200";
            break;
        }
    }

    let onClick = () => {
        setVisibleOverView((prev)=>!prev)
    }

    return <NavLink to={`/classrooms/${classroom.name}`}><div  onClick={onClick}className={styles.classroom} style={!isOccupied?{backgroundColor: "#6bff98"}:{}}>
        <div className={styles.num}>
            <h1 title={classroom.chair}>
                {classroom.name} {classroom.chair!=null ?
                    <FontAwesomeIcon style={{color: "#ffbf00", fontSize: "18px"}} icon={faCrown} />:""
                }
            </h1>

        </div>
        <div className={styles.init} >
            <h1 style={{backgroundColor: initialsColor}} title={userTypeUa}>
            {
                isOccupied ?
                    classroom.occupied.user.firstName.charAt(0) + ". " + classroom.occupied.user.lastName : ""
            }
            </h1>
        </div>
        <div className={styles.spec}></div>
        <div className={styles.desc}>
            {isOccupied?<p>Зайнято до: {untilTime}</p>:""}
        </div>
        <div className={styles.inst}>
            {userType}
        </div>
        <Switch>
        <Route path="/classrooms/:name">
            <Overview isOccupied={isOccupied} classroom={classroom} visible={visibleOverView}/>
        </Route>
    </Switch>

    </div>
    </NavLink>
}

export default Classroom;
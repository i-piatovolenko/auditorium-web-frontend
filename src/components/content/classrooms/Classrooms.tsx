import React from 'react';
import styles from './classrooms.module.css';
import {useSelector} from "react-redux";
import Classroom from "./classroom/Classroom";

const Classrooms = () => {
    // @ts-ignore
    let classrooms = useSelector(state=>state.classroomsReducer.classrooms)

    return <div className={styles.classroomsGrid}>
        {classrooms.map((classroom: any)=><Classroom key={classroom.id} classroom = {classroom}/>)}
    </div>
}

export default Classrooms;
import React from 'react';
import {useSelector} from "react-redux";
import Home from "./Home";

const HomeContainer = () => {
    // @ts-ignore
    let usersCount = useSelector(state => state.usersReducer.users.length);
    // @ts-ignore
    let classroomsCount = useSelector(state => state.classroomsReducer.classrooms.length);
    // @ts-ignore
    let freeClassroomsCount = useSelector(state =>state.classroomsReducer.classrooms)
        // @ts-ignore
        .filter(cl=>cl.occupied===null).length;
    return <Home usersCount={usersCount} classroomsCount={classroomsCount} freeClassroomsCount={freeClassroomsCount}/>
}
export default HomeContainer;
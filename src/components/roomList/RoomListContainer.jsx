import React from 'react'
import RoomList from "./RoomList";
import {connect} from "react-redux";
import {deleteOccupant, setBlurred, setOccupationData} from "../../redux/auditoriumReducer";

function RoomListContainer(props) {

    return <RoomList

        setOccupationData={props.setOccupationData}
        deleteOccupant={props.deleteOccupant}
        setBlurred={props.setBlurred}
    />
}

const mapStateToProp = (state) => {
    return {
        rooms: state.auditoriumReducer.rooms
    }
}

export default connect(mapStateToProp, {deleteOccupant, setOccupationData, setBlurred})(RoomList)
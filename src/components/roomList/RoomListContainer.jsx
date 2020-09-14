import React from 'react'
import RoomList from "./RoomList";
import {connect} from "react-redux";
import {deleteOccupant, setBlurred, setOccupationData} from "../../redux/auditoriumReducer";

class RoomListContainer extends React.Component {
    render() {
        return <RoomList
            rooms={this.props.rooms}
            setOccupationData={this.props.setOccupationData}
            deleteOccupant={this.props.deleteOccupant}
            setBlurred={this.props.setBlurred}
        />
    }
}

const mapStateToProp = (state) => {
    return {
        rooms: state.auditoriumReducer.rooms
    }
}

export default connect(mapStateToProp, {deleteOccupant, setOccupationData, setBlurred})(RoomList)
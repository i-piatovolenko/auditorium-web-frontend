import React from 'react'
import {connect} from "react-redux";
import {setBlurred, setNotificationShown} from "./redux/auditoriumReducer";
import App from "./App";

class AppContainer extends React.Component {
    render() {
        return <App
            blurred={this.props.blurred}
            setBlurred={this.props.setBlurred}
            setNotificationShown={this.props.setNotificationShown}
            logged={this.props.logged}
        />
    }
}

const mapStateToProp = (state) => {
    return {
        blurred: state.auditoriumReducer.blurred,
        notificationShown: state.auditoriumReducer.notificationShown,
        logged: state.authReducer.logged
    }
}

export default connect(mapStateToProp, {setBlurred, setNotificationShown})(App)
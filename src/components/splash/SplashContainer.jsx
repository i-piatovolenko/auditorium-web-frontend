import React from 'react'
import {connect} from "react-redux";
import Splash from "./Splash";
import {setLogged} from "../../redux/authReducer";

class SplashContainer extends React.Component {
    render() {
        return <Splash setLogged={this.props.setLogged}/>
    }
}

const mapStateToProp = (state) => {
    return {
    }
}

export default connect(mapStateToProp, {setLogged})(Splash)
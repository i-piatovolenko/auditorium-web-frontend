import React from 'react';
import {Layout} from 'antd';
import {useDispatch} from "react-redux";
import {fetchClassroomsTC} from "./store/classroomsReducer";
import Sidebar from "./components/Sidebar";
import FooterBar from "./components/FooterBar";
import HeaderBar from "./components/HeaderBar";
import 'antd/dist/antd.css';
import ContentHolder from "./components/content/ContentHolder";
import {fetchUsersTC} from "./store/usersReducer";

const App = () => {

    const dispatch = useDispatch();
    dispatch(fetchClassroomsTC());
    dispatch(fetchUsersTC());

    return <Layout style={{minHeight: '100vh'}}>
        <Sidebar />
        <Layout className="site-layout">
            {/*<HeaderBar/>*/}
            <ContentHolder/>
            <FooterBar/>
        </Layout>
    </Layout>
};

export default App;

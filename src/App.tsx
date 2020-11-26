import React from 'react';
import {Layout} from 'antd';
import {useDispatch} from "react-redux";
import {fetchClassroomsTC} from "./store/classroomsReducer";
import Sidebar from "./components/Sidebar";
import FooterBar from "./components/FooterBar";
import HeaderBar from "./components/HeaderBar";
import 'antd/dist/antd.css';
import ContentHolder from "./components/content/ContentHolder";

const App = () => {

    const dispatch = useDispatch();
    dispatch(fetchClassroomsTC());

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

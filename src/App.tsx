import React from 'react';
import {Layout} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {fetchClassroomsTC} from "./store/classroomsReducer";
import Sidebar from "./components/Sidebar";
import FooterBar from "./components/FooterBar";
import HeaderBar from "./components/HeaderBar";
import 'antd/dist/antd.css';
import ContentHolder from "./components/content/ContentHolder";
import {fetchUsersTC} from "./store/usersReducer";
import LoginPage from "./components/loginPage/LoginPage";
import { Redirect, Route } from 'react-router'

const App = () => {
    // @ts-ignore
    let isLogged = useSelector(state=>state.authReducer.isLogged);
    const dispatch = useDispatch();
    dispatch(fetchClassroomsTC());
    dispatch(fetchUsersTC());

    return <Layout style={{minHeight: '100vh'}}>
        <Route path="/">
            {isLogged ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Sidebar />
        <Layout className="site-layout">
            {/*<HeaderBar/>*/}
            <ContentHolder/>
            <FooterBar/>
        </Layout>
    </Layout>
};

export default App;

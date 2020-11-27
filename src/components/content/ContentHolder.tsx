import React from 'react';
import {Alert, Layout} from 'antd';
import 'antd/dist/antd.css';
import Classrooms from "./classrooms/Classrooms";
import {Route, Switch} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import Home from "./home/Home";
import Schedule from "./classrooms/schedule/Schedule";
import Log from "./classrooms/log/Log";
import Catalog from "./classrooms/catalog/Catalog";

const {Content} = Layout;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const ContentHolder = () => {
    // @ts-ignore
    let isFetching = useSelector(state => state.classroomsReducer.isFetching)
    return <Content style={{margin: '0 16px'}}>
        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>

            <Switch>
                <Route path="/classrooms">
                    {
                        isFetching ?
                            <>
                                <Alert
                                    message="Завантаження даних з сервера..."
                                    description="Зачекайте будь ласка!"
                                    type="info"
                                    showIcon
                                    icon={<Spin indicator={antIcon}/>}
                                />

                            </> : <Classrooms/>
                    }

                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/schedule">
                    <Schedule/>
                </Route>
                <Route path="/log">
                    <Log/>
                </Route>
                <Route path="/catalog">
                    <Catalog/>
                </Route>
            </Switch>
        </div>
    </Content>
};

export default ContentHolder;

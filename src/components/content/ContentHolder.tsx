import React from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import Classrooms from "./classrooms/Classrooms";
import {Route, Switch} from 'react-router-dom';

const {Content} = Layout;

const ContentHolder = () => {

    return <Content style={{margin: '0 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Switch>
                        <Route path="/classrooms">
                            <Classrooms/>
                        </Route>
                    </Switch>
                </div>
            </Content>
};

export default ContentHolder;

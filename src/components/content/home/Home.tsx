import React, {useState} from 'react';
import { UsergroupAddOutlined, TableOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {Statistic, Row, Col, Button, Modal} from 'antd';
import {useSelector} from "react-redux";

const Home = () => {
    // @ts-ignore
    let usersCount = useSelector(state => state.usersReducer.users.length);
    // @ts-ignore
    let classroomsCount = useSelector(state => state.classroomsReducer.classrooms.length);
    // @ts-ignore
    let freeClassroomsCount = useSelector(state =>state.classroomsReducer.classrooms)
        // @ts-ignore
        .filter(cl=>cl.occupied===null).length;
    return <>
        <h2>Вітаємо в Аудиторіумі!</h2>
        <h5>Тут можна керувати електронною чергою, записувати та виписувати відвідувачів у класи.</h5>
        <Row gutter={16}>
            <Col span={4}>
                <Statistic title="Кількість користувачів" value={usersCount} prefix={<UsergroupAddOutlined />} />
            </Col>
            <Col span={4}>
                <Statistic title="Кількість аудиторій" value={classroomsCount} prefix={<TableOutlined />} />
            </Col>
            <Col span={4}>
                <Statistic title="Вільні аудиторії" value={freeClassroomsCount} prefix={<CheckCircleOutlined />} />
            </Col>
        </Row>
    </>
}
export default Home;
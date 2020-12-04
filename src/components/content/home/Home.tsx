import React from "react";
import {
  UsergroupAddOutlined,
  TableOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Statistic, Row, Col } from "antd";

const Home = (props: any) => {
  return (
    <>
      <h2>Вітаємо в Аудиторіумі!</h2>
      <h5>
        Тут можна керувати електронною чергою, записувати та виписувати
        відвідувачів у класи.
      </h5>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic
            title="Кількість користувачів"
            value={props.usersCount}
            prefix={<UsergroupAddOutlined />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Кількість аудиторій"
            value={props.classroomsCount}
            prefix={<TableOutlined />}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="Вільні аудиторії"
            value={props.freeClassroomsCount}
            prefix={<CheckCircleOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};
export default Home;

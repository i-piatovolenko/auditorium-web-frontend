import React from "react";
import { Badge, Card, Collapse } from "antd";
import UsersVerification from "./usersVerification/UsersVerification";
import ClassroomCreator from "./classroomCreator/ClassroomCreator";

const { Panel } = Collapse;

const Administration = () => {
  return (
    <>
      <Card title="Адміністрування" bordered={false} style={{ width: "100%" }}>
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel
            header={[
              "Верифікація нового користувача ",
              <Badge count={20}></Badge>,
            ]}
            key="0"
          >
            <UsersVerification />
          </Panel>
          <Panel header="Створити нову аудиторію" key="1">
            <ClassroomCreator />
          </Panel>
          <Panel header="Змінити статус користувача" key="3"></Panel>
          <Panel header="Додати/Видалити користувача" key="4"></Panel>
        </Collapse>
      </Card>
    </>
  );
};

export default Administration;

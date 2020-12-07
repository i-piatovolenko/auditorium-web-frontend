import React from "react";
import { Badge, Card, Collapse } from "antd";
import UsersVerification from "./usersVerification/UsersVerification";

const { Panel } = Collapse;

const Administration = () => {
  const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world.
    </p>
  );
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
          <UsersVerification/>
          </Panel>
          <Panel header="Створити нову аудиторію" key="1">
            {text}
          </Panel>
          <Panel header="Змінити статус користувача" key="3">
            {text}
          </Panel>
          <Panel header="Додати/Видалити користувача" key="4">
            {text}
          </Panel>
        </Collapse>
      </Card>
    </>
  );
};

export default Administration;

import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons/lib";
import Registration from "../registration/RegistrationContainer";

const Authorisation = (props: any) => {
  let [visible, setVisible] = useState(false);

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={props.onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Номер телефону або e-mail обов'язкові",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Телефон або e-mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Пароль обов'язковий",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запам'ятати мене</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Відновити пароль
          </a>
        </Form.Item>
        <div>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Увійти
            </Button>
            <Button
              onClick={() => setVisible(true)}
              block
              type="primary"
              danger
              style={{ marginTop: 10 }}
            >
              Реєстрація
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Modal
        title="Реєстрація"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        footer={null}
      >
        <Registration />
      </Modal>
    </>
  );
};

export default Authorisation;

import React, {useState} from 'react'
import {Button, Checkbox, Form, Input, Modal} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons/lib";
import Registration from "../registration/Registration";
import styles from "./authorisation.module.css";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../../../api/mutations";
import {useDispatch} from "react-redux";
import {setLoggedAC} from "../../../../store/authReducer";
import { message } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Authorisation = () => {

    let [visible, setVisible] = useState(false);
    let [login] = useMutation(LOGIN);
    let dispatch = useDispatch();
    const error = (errorMessage:string) => {
        message.error(errorMessage);
    };
    const success = () => {
        message.success('Вхід Успішний!');
    };
    const onFinish = (values: any) => {
        login({
            variables: {
                "input": {
                    "email": values.username,
                    "password": values.password
                }
            }
        }).then(r=>{
            if(r.data.login.user===null) {
                console.log(r.data.login.userErrors[0].message);
                error(r.data.login.userErrors[0].message);

            } else {
                dispatch(setLoggedAC(true));
                success();
                console.log(r)
            }
        })
    };
    const onFinishFailed = (errorInfo: any) => {
    };

    return <>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
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
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Телефон або e-mail"/>
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
                    prefix={<LockOutlined className="site-form-item-icon"/>}
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
                    <Button block type="primary" htmlType="submit" className="login-form-button">
                        Увійти
                    </Button>
                    <Button onClick={() => setVisible(true)} block type="primary" danger
                            style={{marginTop: 10}}>Реєстрація</Button>
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
            <Registration/>
        </Modal>
    </>
}

export default Authorisation;
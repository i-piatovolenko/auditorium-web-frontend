import React from "react";
import {Button, Form, Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setVisibleEditModal} from "../../../store/actions";

const EditModal = (props:any) => {
    let dispatch = useDispatch();
    // @ts-ignore
    let visibleEditModal = useSelector(state => state.authReducer.visibleEditModal);
    let handleOk = () => {
        dispatch(setVisibleEditModal(false));
    }

    let handleCancel = () => {
        dispatch(setVisibleEditModal(false));
    }
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
    const [form] = Form.useForm();
    const onFinish = (values:any) => {
        console.log(values);
    };

    return (
        <Modal
            title="Змінити персональні дані"
            visible={visibleEditModal}
            footer={null}
            onCancel={handleCancel}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    label="Прізвище"
                    name="lastName"
                    initialValue={props.lastName}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ім'я"
                    name="name"
                    initialValue={props.firstName}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="По-батькові"
                    name="patronymic"
                    initialValue={props.patronymic}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    initialValue={props.email}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item><Form.Item
                label="Тел."
                name="tel"
                initialValue={props.phoneNumber}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="default" style={{marginRight: 8}} onClick={handleCancel}>
                        Відміна
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleOk}>
                        Змінити
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal;

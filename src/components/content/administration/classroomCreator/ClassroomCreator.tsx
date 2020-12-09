import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Rate,
  Select,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons/lib";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const ClassroomCreator = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ width: "60vw" }}
      >
        <Form.Item
          name={["user", "name"]}
          label="Назва аудиторії"
          rules={[
            {
              required: true,
              message: 'Введіть назву аудиторії!'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"chair"}
          label="Кафедра"
        >
          <Select
            defaultValue="absent"
            style={{ width: 120 }}
            onChange={() => {}}
          >
            <Option value="absent">Немає</Option>
            <Option value="violin">Скрипка</Option>
            <Option value="vocal">Вокал</Option>
            <Option value="piano">Фортепіано</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"special"}
          label="Спец. аудиторія"
        >
          <Select
            defaultValue="absent"
            style={{ width: 120 }}
            onChange={() => {}}
          >
            <Option value="absent">Ні</Option>
            <Option value="piano">Фортепіано</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="floor"
          label="Поверх"
          rules={[
            {
              required: true,
              message: 'Вкажіть поверх!',
              type: "number",
              min: 1,
              max: 4,
            },

          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={"IsWing"} label="Флігель">
          <Checkbox onChange={() => {}}></Checkbox>
        </Form.Item>
        <Form.Item name="desc" label="Опис">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Form.List name="instruments">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Назва інструменту обов'язкова" }]}
                    >
                      <Input placeholder="Назва інструменту" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "type"]}
                      fieldKey={[field.fieldKey, "type"]}
                    >
                      <Select
                        defaultValue="uprightPiano"
                        style={{ width: 120 }}
                        onChange={() => {}}
                      >
                        <Option value="uprightPiano">Фортепіано</Option>
                        <Option value="grandPiano">Рояль</Option>
                        <Option value="harpsichord">Клавісин</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Rate count={10}/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Додати інструмент
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Button type="primary" htmlType="submit">
            Створити
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ClassroomCreator;

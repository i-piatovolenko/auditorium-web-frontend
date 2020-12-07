import React from "react";
import { Card, Descriptions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {CheckCircleFilled, EditOutlined} from "@ant-design/icons/lib";
import EditModal from "./EditModal";
import { userTypesUA } from "../../../lib/constants";
import { setVisibleEditModal } from "../../../store/actions";

const Profile = () => {

  let {
      firstName,
      patronymic,
      lastName,
      type,
      id,
      email,
      phoneNumber,
      extraPhoneNumbers,
      // @ts-ignore
      department } = useSelector((state) => state.authReducer
  );
  let fullName = [" ",firstName, patronymic, lastName, " "].join(" ");
  let dispatch = useDispatch();
  let edit = () => {
    dispatch(setVisibleEditModal(true));
  };
  return (
    <>
      <Card title="Профіль" bordered={false} style={{ width: "100%" }}>
        <Descriptions
          title={[<CheckCircleFilled
              title="Верифіковано!"
              style={{color: "#4baa3a"}}
          />,fullName, <EditOutlined
              title="Редагувати"
              onClick={edit}
          />]}
          column={1}
          bordered
        >
          {/*//@ts-ignore*/}
          <Descriptions.Item label="Статус">{userTypesUA[type]}</Descriptions.Item>
          <Descriptions.Item label="Кафедра">{department}</Descriptions.Item>
          <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
          <Descriptions.Item label="Тел:">{phoneNumber}</Descriptions.Item>
            {extraPhoneNumbers!=="0"?extraPhoneNumbers.split(",").map((el:string)=> {
                return <Descriptions.Item label="Додатковий тел:">{el}</Descriptions.Item>
            }):null}
          <Descriptions.Item label="ID:">{id}</Descriptions.Item>
            {type==="STUDENT"||type==="POST_GRADUATE" ?
                <Descriptions.Item label="Рік навчання">{3}</Descriptions.Item> : null}
        </Descriptions>
      </Card>
      <EditModal
          firstName={firstName}
          patronymic={patronymic}
          lastName={lastName}
          email={email}
          phoneNumber={phoneNumber}
          extraPhoneNumbers={extraPhoneNumbers}
      />
    </>
  );
};

export default Profile;

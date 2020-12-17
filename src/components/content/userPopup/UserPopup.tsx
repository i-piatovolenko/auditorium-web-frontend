import React from "react";
import { Button, Descriptions, Modal } from "antd";
import { useDispatch } from "react-redux";
import { setShowUsersPopup } from "../../../store/actions";
import { useHistory } from "react-router-dom";
import { userTypesUA } from "../../../lib/constants";
import { userTypes } from "../../../store/types";

type Props = {
  visible: boolean;
  user: any;
};

const UserPopup: React.FC<Props> = ({ visible, user }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setShowUsersPopup(false));
    history.goBack();
    document.body.style.overflowY = "scroll";
  };
  const footerButtons = <Button onClick={onClose}>Закрити</Button>;

  const {
    type,
    department,
    phoneNumber,
    email,
    firstName,
    patronymic,
    lastName,
  } = user;
  const name = [lastName, patronymic, firstName].join(" ");

  const typeUa = userTypesUA[type as userTypes];

  return (
    <Modal
      onCancel={onClose}
      title={name}
      visible={visible}
      footer={footerButtons}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Статус">{typeUa}</Descriptions.Item>
        <Descriptions.Item label="Кафедра">{department}</Descriptions.Item>
        <Descriptions.Item label="Тел.">
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </Descriptions.Item>
        <Descriptions.Item label="E-mail">
          <a href={`mailto:${email}`}>{email}</a>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserPopup;

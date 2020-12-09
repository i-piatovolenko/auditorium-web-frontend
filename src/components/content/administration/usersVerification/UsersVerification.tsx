import React, { useState } from "react";
import { userTypesUA } from "../../../../lib/constants";
import { useSelector } from "react-redux";
import styles from "./usersVerification.module.css";
import { Button, Card } from "antd";
import { Input } from "antd";

const { Search } = Input;

const UsersVerification = () => {
  // @ts-ignore
  let users = useSelector((state) => state.usersReducer.users)
    .filter((u: any) => u.type === "STUDENT")
    .slice(1, 20);
  let [tempUsers, setTempUsers] = useState(users);
  const onChange = (e:any) => {
      setTempUsers((prev: any) =>
          users.filter((u: any) => {
              return [u.lastName, u.firstName, u.patronymic, u.id].join(" ").match(e.target.value);
          })
      );
    }

  return (
    <>
        <Input placeholder="Пошук користувача (П.І.Б. або ID)" onChange={onChange} style={{width: 280, margin: 5}}/>
      <div className={styles.verificationUsersList}>
        {tempUsers.map((u: any) => (
          <Card
            title={[u.lastName, u.firstName, u.patronymic].join(" ")}
            bordered={false}
            style={{ margin: 5, maxHeight: 300 }}
          >
            {/*//@ts-ignore*/}
            <p>Статус: {userTypesUA[u.type]}</p>
            <p>Тел.: {u.phoneNumber}</p>
            <p>E-mail: {u.email}</p>
            <p>ID: {u.id}</p>
            <Button type="primary">Верифікувати</Button>
          </Card>
        ))}
      </div>
    </>
  );
};

export default UsersVerification;

import React from "react";
import { Alert, AutoComplete, Descriptions, Select, Slider, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./free.module.css";
import {
  occupyClassroomAC,
  setDisabledButton,
  setUntilValue,
  setUserIdValue,
} from "../../../../../../store/actions";

const Free = ({ classroom, disabledButton }: any) => {
  const dispatch = useDispatch();

  function formatter(value: any) {
    switch (value) {
      case 1:
        return "15 хв.";
      case 2:
        return "30 хв.";
      case 3:
        return "45 хв.";
      case 4:
        return "1 год.";
      case 5:
        return "1 год. 15 хв.";
      case 6:
        return "1 год. 30 хв.";
      case 7:
        return "1 год. 45 хв.";
      case 8:
        return "2 год.";
      case 9:
        return "2 год. 15 хв.";
      case 10:
        return "2 год. 30 хв.";
      case 11:
        return "2 год. 45 хв.";
      case 12:
        return "3 год.";
    }
  }

  const marks = {
    4: "1 год.",
    8: "2 год.",
    12: "3 год",
  };
  // @ts-ignore
  let users = useSelector((state) => state.usersReducer.users);
  const options = users.map((u: any) => ({
    value: [u.id, "-", u.firstName, u.patronymic, u.lastName].join(" "),
    id: u.id,
  }));
  const { Option } = Select;
  return (
    <div className={styles.descriptionGrid}>
      <div>
        <Descriptions size="small" title="Інформація:" bordered column={1}>
          <Descriptions.Item label="Рейтинг:">5</Descriptions.Item>
          <Descriptions.Item label="Опис:">
            {classroom.description}
          </Descriptions.Item>
          <Descriptions.Item label="Спец. аудиторія:">
            {classroom.special ? classroom.special : "Ні"}
          </Descriptions.Item>
          <Descriptions.Item label="Кафедра:">
            {classroom.chair ? classroom.chair : "Немає"}
          </Descriptions.Item>
          <Descriptions.Item label="Інструменти:">
            {
              <Descriptions size="small" bordered column={1}>
                {classroom.instruments.map((instr: any) => {
                  return (
                    <Descriptions.Item label={instr.type}>
                      {instr.name + " — " + instr.rate}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            }
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div>
        <Descriptions
          size="small"
          title="Записати в аудиторію:"
          column={1}
        ></Descriptions>
        <Space
          style={{
            width: "100%",
          }}
          direction="vertical"
          size="small"
        >
          {disabledButton ? (
            <Alert message="Виберіть користувача" type="error" />
          ) : (
            ""
          )}
          <AutoComplete
            style={{
              width: "100%",
            }}
            options={options}
            placeholder="Введіть ім'я користувача або ID"
            filterOption={(inputValue, option) =>
              // @ts-ignore
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={(v: any, o: any) => {
              dispatch(setUserIdValue(Number(o.id)));
              dispatch(setDisabledButton(false));
            }}
          />
          <p>Вкажіть термін перебування в аудиторії:</p>
        </Space>
        <Slider
          defaultValue={4}
          marks={marks}
          min={1}
          max={12}
          tipFormatter={formatter}
          onChange={(value: any) => dispatch(setUntilValue(900000 * value))}
        />
      </div>
    </div>
  );
};
export default Free;

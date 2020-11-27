import React from 'react';
import {Alert, AutoComplete, Button, Descriptions, Select, Slider, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import styles from './free.module.css';
import {gql, useMutation} from "@apollo/client";
import {
    occupyClassroomAC,
    setDisabledButtonAC,
    setUntilValueAC,
    setUserIdValueAC
} from "../../../../../../store/classroomsReducer";

const Free = ({classroom, disabledButton}: any) => {
    const dispatch = useDispatch();

    function formatter(value: any) {
        switch (value) {
            case 1:
                return "15 хв."
            case 2:
                return "30 хв."
            case 3:
                return "45 хв."
            case 4:
                return "1 год."
            case 5:
                return "1 год. 15 хв."
            case 6:
                return "1 год. 30 хв."
            case 7:
                return "1 год. 45 хв."
            case 8:
                return "2 год."
            case 9:
                return "2 год. 15 хв."
            case 10:
                return "2 год. 30 хв."
            case 11:
                return "2 год. 45 хв."
            case 12:
                return "3 год."
        }
    }

    const marks = {
        4: '1 год.',
        8: '2 год.',
        12: '3 год',
    };
    // @ts-ignore
    let users = useSelector(state => state.usersReducer.users);
    const options = users.map((u: any) => ({value: u.firstName + " " + u.patronymic + " " + u.lastName, id: u.id}));
    const {Option} = Select;
    return <div className={styles.descriptionGrid}>
        <div>
            <Descriptions size="small" title="Інформація:" bordered column={1}>
                <Descriptions.Item label="Рейтинг:">5</Descriptions.Item>
                <Descriptions.Item label="Опис:">{classroom.description}</Descriptions.Item>
                <Descriptions.Item
                    label="Спец. аудиторія:">{classroom.special ? classroom.special : "Ні"}</Descriptions.Item>
                <Descriptions.Item label="Кафедра:">{classroom.chair ? classroom.chair : "Немає"}</Descriptions.Item>
                <Descriptions.Item label="Інструменти:">
                    {
                        <Descriptions size="small" bordered column={1}>
                            <Descriptions.Item label="Піаніно:">Україна</Descriptions.Item>
                        </Descriptions>
                    }
                </Descriptions.Item>
            </Descriptions>
        </div>
        <div>
            <Descriptions size="small" title="Записати в аудиторію:" column={1}>
            </Descriptions>
            <Space style={{
                width: "100%"
            }} direction="vertical" size="small">
                {
                    disabledButton ?
                    <Alert message="Виберіть користувача" type="error"/> : ""
                }
                <AutoComplete
                    style={{
                        width: "100%"
                    }}
                    options={options}
                    placeholder="Введіть ім'я користувача"
                    filterOption={(inputValue, option) =>
                        // @ts-ignore
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={(v: any, o: any) => {
                        dispatch(setUserIdValueAC(Number(o.id)));
                        dispatch(setDisabledButtonAC(false));
                    }}
                />
                {/*<Select defaultValue="STUDENT" style={{ width: 120 }} onChange={()=>{}}>*/}
                {/*    <Option value="STUDENT">Студент</Option>*/}
                {/*    <Option value="TEACHER">Педагог</Option>*/}
                {/*    <Option value="POST_GRADUATE">Асистент/Аспірант</Option>*/}
                {/*    <Option value="ADMINISTRATION">Адміністрація</Option>*/}
                {/*    <Option value="CONCERTMASTER">Концертмейстер</Option>*/}
                {/*    <Option value="ILLUSTRATOR">Іллюстратор</Option>*/}
                {/*</Select>*/}
                <p>Вкажіть термін перебування в аудиторії:</p>
            </Space>
                <Slider
                    defaultValue={4}
                    marks={marks}
                    min={1}
                    max={12}
                    tipFormatter={formatter}
                    onChange={(value: any) => dispatch(setUntilValueAC(900000 * value))}/>

        </div>
    </div>
}
export default Free;
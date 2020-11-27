import React from 'react';
import {Descriptions} from "antd";
import styles from './occupied.module.css'

const Occupied = ({classroom}: any) => {

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
            <Descriptions size="small" title="Зайнято:" bordered column={1}>
                <Descriptions.Item label="До:">14:00</Descriptions.Item>
                <Descriptions.Item label="Ким:">
                    {
                        classroom.occupied.user.type + " | " +
                        classroom.occupied.user.firstName + " " + classroom.occupied.user.lastName
                    }</Descriptions.Item>
                <Descriptions.Item label="Тел.:">Немає</Descriptions.Item>
            </Descriptions>
        </div>
    </div>
}
export default Occupied;
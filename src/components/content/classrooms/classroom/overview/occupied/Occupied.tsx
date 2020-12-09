import React from 'react';
import {Descriptions} from "antd";
import styles from './occupied.module.css'

const Occupied = ({classroom}: any) => {

    let occupiedUntil = new Date(classroom.occupied.until);

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
                            {classroom.instruments.map((instr:any)=> {
                                return <Descriptions.Item label={instr.type}>
                                    {instr.name + " — " + instr.rate}
                                </Descriptions.Item>
                            })}

                        </Descriptions>
                    }
                </Descriptions.Item>
                <Descriptions.Item label="Розклад:">
                    {classroom.schedule.map((el:any)=>{
                        return <p>{el.user.lastName} — з {el.from} до {el.to}</p>
                    })}
                </Descriptions.Item>
            </Descriptions>
        </div>
        <div>
            <Descriptions size="small" title="Зайнято:" bordered column={1}>
                <Descriptions.Item label="До:">
                    {
                        occupiedUntil.getHours() + ":" + occupiedUntil.getMinutes()
                    }
                </Descriptions.Item>
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
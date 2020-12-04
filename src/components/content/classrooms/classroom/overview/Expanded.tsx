import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Modal} from 'antd';
import {useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {freeClassroomAC} from "../../../../../store/actions";
import {gql, useMutation} from "@apollo/client";
import Occupied from "./occupied/Occupied";
import Free from "./free/Free";
import {fetchClassroomsTC} from "../../../../../store/effects";

const Expanded = (props: any) => {


    let [visible, setVisible] = useState(true)

    let showModal = () => {
        setVisible(true)
    };

    let handleOk = () => {
        setVisible(false)
    };

    let handleCancel = () => {
        setVisible(false)
    };

    const FREE_CLASSROOM = gql`
        mutation free($input: FreeClassroomInput!){
            freeClassroom(input: $input) {
                classroom {
                    name
                    occupied {
                        user {
                            id
                        }
                    }
                }
                userErrors {
                    message
                    code
                }
            }
        }
    `;
    const [freeClassroom, {loading, error, data}] = useMutation(FREE_CLASSROOM);
    const dispatch = useDispatch();
    // @ts-ignore
    let {name} = useParams();
    let classroom = props.classroom;
    let isOccupied = props.isOccupied;
    let footerButtonOk = isOccupied ? <><Button key="submit" type="primary" onClick={() => {
    }}>
        Передати аудиторію
    </Button><Button key="submit" type="primary" danger onClick={() => {
        freeClassroom({
            variables: {
                "input": {
                    "classroomName": name
                }
            }
        }).then(r => {
            dispatch(fetchClassroomsTC);
            dispatch(freeClassroom(classroom.name))
        });
    }
    }>
        Звільнити аудиторію
    </Button></> : <Button key="submit" type="primary" onClick={() => {
    }}>
        Записати в аудиторію
    </Button>;

    return <Modal
        title={"Аудиторія №" + name}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={() => {
            }}>
                Закрити
            </Button>,
            footerButtonOk,
        ]}
    >
        {
            isOccupied ?
                <Occupied isOccupied={isOccupied} classroom={classroom}/> :
                <Free isOccupied={isOccupied} classroom={classroom}/>
        }
    </Modal>
};

export default Expanded;
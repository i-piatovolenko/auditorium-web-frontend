import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {freeClassroomAC, occupyClassroomAC, setDisabledButton, setModalVisible} from "../../../../../store/actions";
import {useMutation} from "@apollo/client";
import Occupied from "./occupied/Occupied";
import Free from "./free/Free";
import {fetchClassroomsTC} from "../../../../../store/effects";
import {FREE_CLASSROOM, OCCUPY_CLASSROOM} from "../../../../../api/mutations";

const Expanded = (props: any) => {
    // @ts-ignore
    let visible = useSelector(state=>state.classroomsReducer.modalVisible)
    // @ts-ignore
    let userId = useSelector((state) => state.classroomsReducer.userIdValue);
    // @ts-ignore
    let disabledButton = useSelector((state) => state.classroomsReducer.disabledButton
    );
    // @ts-ignore
    let untilValue = useSelector((state) => state.classroomsReducer.untilValue);
    const dispatch = useDispatch();
    let isOccupied = props.isOccupied;
    let handleOk = () => {
        dispatch(setModalVisible(false));
        dispatch(setDisabledButton(true));
    };
    let handleCancel = () => {
        dispatch(setModalVisible(false));
        dispatch(setDisabledButton(true));
    };
    const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM);
    const [freeClassroom] = useMutation(FREE_CLASSROOM);
    let footerButtonOk = isOccupied ? (
        <>
            <Button key="submit" type="primary" onClick={() => {}}>
                Передати аудиторію
            </Button>
            <Button
                key="submit"
                type="primary"
                danger
                onClick={() => {
                    freeClassroom({
                        variables: {
                            input: {
                                classroomName: props.classroom.name,
                            },
                        },
                    }).then((r) => {
                        dispatch(fetchClassroomsTC);
                        dispatch(freeClassroomAC(props.classroom.name));
                        dispatch(setDisabledButton(true));
                        dispatch(setModalVisible(false));
                    });
                }}
            >
                Звільнити аудиторію
            </Button>
        </>
    ) : (
        <Button
            disabled={disabledButton}
            key="submit"
            type="primary"
            onClick={() => {
                occupyClassroom({
                    variables: {
                        input: {
                            classroomName: String(props.classroom.name),
                            userId: userId,
                            until: new Date(new Date().getTime() + untilValue),
                        },
                    },
                }).then((r) => {
                    let occupiedData = r.data.occupyClassroom.classroom.occupied;
                    dispatch(occupyClassroomAC(occupiedData, props.classroom.name));
                    dispatch(setDisabledButton(true));
                    dispatch(setModalVisible(false));
                });
            }}
        >
            Записати в аудиторію
        </Button>
    );

    return <Modal
        title={"Аудиторія №" + props.classroom.name}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
                Закрити
            </Button>,
            footerButtonOk,
        ]}
        width={1000}
    >
        {props.isOccupied ? (
            <Occupied classroom={props.classroom} />
        ) : (
            <Free
                disabledButton={disabledButton}
                classroom={props.classroom}
            />
        )}
    </Modal>
};

export default Expanded;
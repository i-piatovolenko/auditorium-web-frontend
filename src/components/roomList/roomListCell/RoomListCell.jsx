import React from 'react'
import * as style from './roomListCell.module.css'
import {Modal, Slider, Select, Input, Descriptions, Divider} from "antd";
import 'antd/dist/antd.css';
import piano from "./../../../piano.svg"

const {Option} = Select;

class RoomListCell extends React.Component {
    state = {
        visible: false,
        selectedUserType: "Студент",
        selectedUserName: undefined,
        selectedTime: (new Date().getHours() + 1) + ":" + new Date().getMinutes()
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        this.props.setBlurred(false)
        if (this.props.room.occupied.value) {
            this.props.deleteOccupant(this.props.room.id)
        } else {
            this.props.setOccupationData(this.props.room.id, this.state.selectedUserName, this.state.selectedUserType, this.state.selectedTime)
        }
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.props.setBlurred(false)
        this.setState({
            visible: false,
        });
    };

    handleChange = value => {
        this.setState({
            selectedUserType: value
        })
    }
    handleInputChange = e => {
        this.setState({
            selectedUserName: e.target.value,
        })
    }

    handleSliderChange = e => {
        let now = new Date();
        let hours = now.getHours() + (e >= 60 ? e >= 120 ? e == 180 ? 3 : 2 : 1 : 0);
        let minutes = now.getMinutes()
        this.setState({
            selectedTime: hours + ":" + minutes
        })
    }

    render() {
        return <>
            <Modal
                title={this.props.room.occupied.value ? `Аудиторія №${this.props.room.name}` : `Запис в аудиторію №${this.props.room.name}`}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                cancelText="Відмінити"
                okText={this.props.room.occupied.value ? "Звільнити аудиторію" : "Запис в аудиторію"}
            >
                {this.props.room.occupied.value ? <>
                    <p>{this.props.room.description}</p>
                    <ul className={style.instrumentsList}>
                        {this.props.room.instruments.map(el => <li>
                            <span className={style.instrument}>{el.name}</span> &#8195;
                            <span className={style.rate}>{el.rate}</span>
                        </li>)}
                    </ul>
                    <Divider/>
                    <Descriptions column={1} title="Аудиторія зайнята">
                        <Descriptions.Item label="Тип">{this.props.room.occupied.by.type}</Descriptions.Item>
                        <Descriptions.Item label="ПІБ">{this.props.room.occupied.by.name}</Descriptions.Item>
                    </Descriptions>
                </> : <>
                    <p>{this.props.room.description}</p>
                    <ul className={style.instrumentsList}>
                        {this.props.room.instruments.map(el => <li>
                            <span className={style.instrument}>{el.name}</span> &#8195;
                            <span className={style.rate}>{el.rate}</span>
                        </li>)}
                    </ul>
                    <p>{this.props.room.occupied.by.type.toUpperCase()}</p>
                    <p>{this.props.room.occupied.by.name.toUpperCase()}</p>
                    <Divider/>
                    <Descriptions column={1} title="Запис в аудиторію">
                        <Descriptions.Item label="Тип"><Select defaultValue="Студент" style={{width: 120}}
                                                               onChange={this.handleChange}>
                            <Option value="Студент">Студент</Option>
                            <Option value="Педагог">Педагог</Option>
                            <Option value="Адміністрація">Адміністрація</Option>
                            <Option value="Інше">Інше</Option>
                        </Select></Descriptions.Item>
                        <Descriptions.Item label="ПІБ"><Input onChange={this.handleInputChange}
                                                              placeholder="Прізвище І. П."/></Descriptions.Item>
                        <Descriptions.Item label="Час резервації (хв.)">
                            <Slider onChange={this.handleSliderChange} step={60} max={180}
                                    defaultValue={60}/></Descriptions.Item>
                    </Descriptions>
                </>}
            </Modal>

            <div style={this.props.room.occupied.value ? {backgroundColor: '#ffffff'} : {backgroundColor: '#c0ff86'}}
                 className={style.cell} onClick={() => {
                this.props.setBlurred(true)
                this.setState({visible: true})
            }}>
                {this.props.room.isSpecial.value?<div style={{
                    position: "relative",
                    left: "97%",
                    top: "-13%",
                    marginBottom: "-20px",
                }}>{
                    <img src={piano} alt="" style={{
                        width: "26px",
                        height: "26ph",
                        padding: "2px",
                        backgroundColor: "#fff",
                        borderRadius: "5px"
                    }}/>
                }</div>:""}
                <h1><span className={[style.roomName, this.props.room.isSpecial.value ? style.special : ""].join(" ")}>
                    {this.props.room.name}
                </span>
                    {this.props.room.occupied.value ? <span
                        className={[style.type, this.props.room.occupied.by.type === "Педагог" ? style.typeTeacher : style.typeStudent].join(" ")}
                    >
                {this.props.room.occupied.by.name}
            </span> : ""}
                </h1>
                {this.props.room.occupied.value ?
                    <p className={style.until}>Зайнято до: {this.props.room.occupied.until}</p> : ""}


                <ul className={style.instrumentsList}>
                    {this.props.room.instruments.map(el => <li>
                        <span className={style.instrument}>{el.name}</span> &#8195;
                        <span className={style.rate}>{el.rate}</span>
                    </li>)}
                </ul>
            </div>
        </>
    }
}

export default RoomListCell;
import React from 'react'
import RoomListCell from "./roomListCell/RoomListCell";
import * as style from './roomList.module.css'
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import { Radio } from 'antd';

const { Panel } = Collapse;

class RoomList extends React.Component {

    state = {
        value: 1,
    };

    radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return <>
            <Collapse ghost>
                <Panel header="Фільтри" key="1">
                    <Radio.Group  onChange={this.onChange} value={this.state.value}>
                        <Radio style={this.radioStyle} value={1}>
                            Всі аудиторії
                        </Radio>
                        <Radio style={this.radioStyle} value={2}>
                            Вільні
                        </Radio>
                        <Radio style={this.radioStyle} value={3}>
                            Спеціалізовані
                        </Radio>
                        <Radio style={this.radioStyle} value={4}>
                            Кафедральні
                        </Radio>
                    </Radio.Group>
                </Panel>
            </Collapse>
            <ul className={style.roomList}>{this.props.rooms.map(room => <li
                className={room.occupied.value ? "" : style.released}>{room.name}</li>)}</ul>
            <ul className={style.rooms}>
                {this.props.rooms.map(room => <li key={room.id}><RoomListCell
                    setOccupationData={this.props.setOccupationData}
                    deleteOccupant={this.props.deleteOccupant}
                    room={room}
                    setBlurred={this.props.setBlurred}
                /></li>)
                }
            </ul>
        </>
    }
}

export default RoomList;
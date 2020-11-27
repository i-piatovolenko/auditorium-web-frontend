import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import {
    HomeOutlined,
    SettingOutlined,
    TableOutlined,
    ScheduleOutlined,
    UserOutlined,
    IdcardOutlined,
    FileExcelOutlined,
    LogoutOutlined,
    AlignLeftOutlined,
} from '@ant-design/icons';
import {NavLink, Router, useHistory} from 'react-router-dom';

const {Sider} = Layout;

const Sidebar = () => {

    let history = useHistory();

    let [collapsed, setCollapsed] = useState(false);
    let onCollapse = () => {
        setCollapsed(!collapsed);
    };


    return <Sider theme="light" collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div >
        <div className="logo" style={{textAlign: "center", padding: "10px"}}>
            {
                collapsed ? <h2 style={{color: "#171734"}}>AU</h2> : <h2 style={{color: "#171734"}}>AUDITORIUM</h2>
            }
        </div>
            <Router history={history}>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0" icon={<HomeOutlined/>}>
                <NavLink to="/">Головна</NavLink>
            </Menu.Item>
            <Menu.Item key="1" icon={<TableOutlined/>}>
                <NavLink to="/classrooms/">Аудиторії</NavLink>
            </Menu.Item>
            <Menu.Item disabled key="2" icon={<ScheduleOutlined/>}>
                <NavLink to="/schedule">Розклад</NavLink>
            </Menu.Item>
            <Menu.Item disabled key="3" icon={<FileExcelOutlined/>}>
                <NavLink to="/log">Журнал</NavLink>
            </Menu.Item>
            <Menu.Item disabled key="4" icon={<IdcardOutlined style={{color: "#ff9203"}}/>}>
                <NavLink to="/teachers">Педагоги</NavLink>
            </Menu.Item>
            <Menu.Item disabled key="5" icon={<AlignLeftOutlined style={{color: "#037dff"}}/>}>
                <NavLink to="/students">Студенти</NavLink>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item disabled key="6" icon={<SettingOutlined/>}>
                <NavLink to="/settings">Налаштування</NavLink>
            </Menu.Item>
            <Menu.Item disabled key="7" icon={<UserOutlined/>}>
                <NavLink to="/profile">Профіль</NavLink>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item disabled key="8" icon={<LogoutOutlined/>}>
               <NavLink to="/logout">Вийти</NavLink>
            </Menu.Item>
        </Menu>
            </Router>
        </div>
    </Sider>
}

export default Sidebar;
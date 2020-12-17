import React, {useEffect, useState} from "react";
import { Card, Layout, Menu} from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  TableOutlined,
  ScheduleOutlined,
  UserOutlined,
  IdcardOutlined,
  FileExcelOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, Router, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { userTypesUA } from "../lib/constants";
import { Me } from "../store/types";
import styles from './sidebar.module.css';
import {UsergroupAddOutlined} from "@ant-design/icons/lib";
import {AuditoriumStateType} from "../store/store";

const { Sider } = Layout;

const Sidebar = () => {
  let history = useHistory();

  let [collapsed, setCollapsed] = useState(false);
  let onCollapse = () => {
    setCollapsed(!collapsed);
  };

  let me: Me = useSelector((state: AuditoriumStateType) => state.authReducer);
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div>
        <div
          className="logo"
          style={{ textAlign: "center", padding: "10px 10px 0px 10px" }}
        >
          {collapsed ? (
            <h2 style={{ color: "#171734", marginBottom: 0 }}>AU</h2>
          ) : (
            <h2 style={{ color: "#171734", marginBottom: 0 }}>AUDITORIUM</h2>
          )}
        </div>
            <div className={collapsed?styles.profileCardCollapsed:styles.profileCard}>
          <Card
            title={me.firstName + " " + me.lastName}
            style={{ width: "100%", marginTop: 10 }}
          >
            <p>Статус: {userTypesUA[me.type]}</p>
            <NavLink to="/profile">Профіль</NavLink>
          </Card>
            </div>
        <Router history={history}>
          <Menu theme="light" defaultSelectedKeys={["0"]} mode="inline">
            <Menu.Item key="0" icon={<HomeOutlined />}>
              <NavLink to="/">Головна</NavLink>
            </Menu.Item>
            <Menu.Item key="1" icon={<TableOutlined />}>
              <NavLink to="/classrooms/">Аудиторії</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<ScheduleOutlined />}>
              <NavLink to="/schedule">Розклад</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileExcelOutlined />}>
              <NavLink to="/register">Журнал</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<IdcardOutlined />}>
              <NavLink to="/catalog">Каталог</NavLink>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="6" icon={<UsergroupAddOutlined />}>
              <NavLink to="/administration">Адміністрування</NavLink>
            </Menu.Item>
            <Menu.Item key="7" icon={<SettingOutlined />}>
              <NavLink to="/settings">Налаштування</NavLink>
            </Menu.Item>
            <Menu.Item key="8" icon={<UserOutlined />}>
              <NavLink to="/profile">Профіль</NavLink>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item disabled key="9" icon={<LogoutOutlined />}>
              <NavLink to="/logout">Вийти</NavLink>
            </Menu.Item>
          </Menu>
        </Router>
      </div>
    </Sider>
  );
};

export default Sidebar;

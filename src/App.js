import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, notification, Button, Dropdown} from 'antd';
import RoomListContainer from "./components/roomList/RoomListContainer";
import {NavLink, Route, Redirect} from "react-router-dom";
import Settings from "./components/settings/Settings";
import Schedule from "./components/schedule/Schedule";
import crown from './crown.svg'
import piano from './piano.svg'
import { CloseSquareFilled } from '@ant-design/icons';
import SplashContainer from "./components/splash/SplashContainer";

const menu = (
    <Menu>
      <Menu.Item key="1">Учбова Частина</Menu.Item>
      <Menu.Item key="1">Розклад</Menu.Item>
      <Menu.Item key="1">Налаштування</Menu.Item>
      <Menu.Item key="1">Допомога</Menu.Item>
    </Menu>
);

const { Header, Content, Footer } = Layout;
const openNotification = (setBlurred, setNotificationShown) => {
  const args = {
    message: 'Ласкаво просимо!',
    description: <><p>Це — застосунок "Auditorim - Учбова частина". Тут можна керувати записом людей в аудиторії.
        Будь ласка, ознайомтесь з умовними позначками, які використовуються в цьому додатку!</p>
      <ul>
        <li><span style={{
          fontSize: '2rem',
          padding: '0 5px',
          borderRadius: '10px',
          border: '1px solid #dddddd',
          marginRight: '10px'
        }
        }>23</span> - так позначається номер аудиторії.</li>
      <li>Вільні аудиторії відображаються зеленим кольором.</li>
        <li>Якщо аудиторію займає <span style={{
          backgroundColor: "dodgerblue",
          color: "white",
          padding: "0px 5px 5px 5px",
          borderRadius: "5px"}}>студент</span> — він позначається синім кольором.</li>
      <li><span style={{
        backgroundColor: "darkorange",
        color: "white",
        padding: "0px 5px 5px 5px",
        borderRadius: "5px"}}>Викладач</span> - помаранчевим.</li>
        <li>
          <img src={crown} alt="" style={{width: "20px", height: "20px"}}/> — кафедральна аудиторія.
        </li>
        <li>
          <img src={piano} alt="" style={{width: "20px", height: "20px"}}/> — спеціалізована аудиторія.
        </li>
      </ul>
      <p>Також, для кожної аудиторії вказуються наявні музичні інструменти та їх рейтинг (від 1 до 5).</p>
      <p>Щоб записати/виписати людину, натисніть на потрібну аудиторію.</p>
      <Button  type={"primary"} block onClick={()=> {
        localStorage.setItem("welcome", "0")
        notification.close("Welcome")
        setBlurred(false)
        setNotificationShown(true)
      }}>Зрозуміло, більше не показувати</Button>
    </>,
    duration: 0,
    key: "Welcome",
    closeIcon: <CloseSquareFilled onClick={()=> {
      setNotificationShown(true)
      setBlurred(false)
    }} style={{color: "#c31936", fontSize: "24px"}}/>
  };
  if(localStorage.getItem("welcome")!="0") notification.open(args);
};

const App = (props) => {

  useEffect(()=> {
    openNotification(props.setBlurred, props.setNotificationShown)
  }, props.notificationShown)

  document.title = "Auditorium - Учбова частина"
  return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
    <div>
      {props.logged?<Layout
          className="layout"
          style={props.blurred?{filter: "blur(10px)", transition: "all .2s linear"}:{filter: "blur(0px)", transition: "all .2s linear"}}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><NavLink to="/">Auditorium - Учбова частина</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/schedule">Розклад</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to="/log">Журнал</NavLink></Menu.Item>
            <Menu.Item key="4"><NavLink to="/settings">Налаштування</NavLink></Menu.Item>

          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: "70px" }}>
          <Route exact path="/" render={()=><RoomListContainer/>}/>
          <Route path="/schedule" render={()=><Schedule/>}/>
          <Route path="/settings" render={()=><Settings/>}/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Auditorium ©2020 IP&VN</Footer>
      </Layout>:<SplashContainer/>
      }
    </div>
      </Dropdown>
  );
}

export default App;

import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


const Settings = (props) => {
    return <>
        <Content style={{ padding: '0 50px' }}>
    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
            >
                    <Menu.Item key="1">Профіль</Menu.Item>
                    <Menu.Item key="2">Учбова частина</Menu.Item>
                    <Menu.Item key="3">Розклад</Menu.Item>
            </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: "100vh", backgroundColor: "#fff" }}>Налаштування</Content>
    </Layout>
    </Content>
    </>
}

export default Settings;
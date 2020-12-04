import React from "react";
import { Layout } from "antd";
import Sidebar from "../../components/Sidebar";
import "antd/dist/antd.css";
import PageHolder from "../PageHolder";
import LoginPage from "../../components/loginPage/LoginPage";
import { Redirect, Route } from "react-router";

const { Footer, Header } = Layout;

const App = ({isLogged, ...props}:any) => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Route path="/">{isLogged ? <Redirect to="/" /> : <LoginPage />}</Route>
      <Sidebar />
      <Layout className="site-layout">
        {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}
        <PageHolder />
        <Footer style={{ textAlign: "center", color: "#b6b6b6" }}>
          Auditorium ©2020 Created by Ivan Piatovolenko & Vlad Nazarenko
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;

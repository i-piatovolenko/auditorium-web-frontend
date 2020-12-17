import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import PagesRouter from "./PagesRouter/PagesRouterContainer";

const { Content } = Layout;

const PageHolder = () => {

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <PagesRouter />
      </div>
    </Content>
  );
};

export default PageHolder;

import React from "react";
import { Route, Switch } from "react-router-dom";
import { Alert, Spin } from "antd";
import ClassroomsGrid from "../../components/content/classrooms/Grid";
import Home from "../../components/content/home/HomeContainer";
import Schedule from "../../components/content/schedule/Schedule";
import Log from "../../components/content/register/Register";
import Catalog from "../../components/content/catalog/Catalog";
import { LoadingOutlined } from "@ant-design/icons/lib";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PagesRouter = (props: any) => (
  <Switch>
    <Route path="/classrooms">
      {props.isFetching ? (
        <Alert
          message="Завантаження даних з сервера..."
          description="Зачекайте будь ласка!"
          type="info"
          showIcon
          icon={<Spin indicator={antIcon} />}
        />
      ) : (
        <ClassroomsGrid />
      )}
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/schedule">
      <Schedule />
    </Route>
    <Route path="/register">
      <Log />
    </Route>
    <Route path="/catalog">
      <Catalog />
    </Route>
  </Switch>
);

export default PagesRouter;

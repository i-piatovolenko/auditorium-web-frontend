import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import { Alert, Spin } from "antd";
import Home from "../../components/content/home/HomeContainer";
import Schedule from "../../components/content/schedule/Schedule";
import Log from "../../components/content/register/Register";
import Catalog from "../../components/content/catalog/Catalog";
import { LoadingOutlined } from "@ant-design/icons/lib";
import Administration from "../../components/content/administration/Administration";
import Settings from "../../components/content/settings/Settings";
import Profile from "../../components/content/profile/Profile";
import ClassroomsPage from "../../components/content/classrooms/ClassroomsPageContainer";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PagesRouter = (props: any) => {
  return (
    <Switch>
      <Route path="/classrooms/:name?/:userId?">
        {props.isFetching ? (
          <Alert
            message="Завантаження даних з сервера..."
            description="Зачекайте будь ласка!"
            type="info"
            showIcon
            icon={<Spin indicator={antIcon} />}
          />
        ) : (
          <ClassroomsPage />
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
      <Route path="/catalog/:userId?">
        <Catalog />
      </Route>
      <Route path="/administration">
        <Administration />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </Switch>
  );
};

export default PagesRouter;

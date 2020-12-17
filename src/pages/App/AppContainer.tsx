import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { fetchClassroomsTC, fetchUsersTC } from "../../store/effects";
import App from "./App";
import {AuditoriumStateType} from "../../store/store";

const AppContainer = () => {
  let isLogged:boolean = useSelector((state: AuditoriumStateType) => state.authReducer.isLogged);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClassroomsTC());
    dispatch(fetchUsersTC());
  });
  return <App isLogged={isLogged} />;
};

export default AppContainer;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { fetchClassroomsTC, fetchUsersTC } from "../../store/effects";
import App from "./App";

const AppContainer = () => {
  // @ts-ignore
  let isLogged:boolean = useSelector((state) => state.authReducer.isLogged);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClassroomsTC());
    dispatch(fetchUsersTC());
  });

  return <App isLogged={isLogged} />;
};

export default AppContainer;

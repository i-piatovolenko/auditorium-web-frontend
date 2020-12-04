import React from "react";
import { useSelector } from "react-redux";
import PagesRouter from "./PagesRouter";

const PagesRouterContainer = () => {
  // @ts-ignore
  let isFetching = useSelector((state) => state.classroomsReducer.isFetching);
  return <PagesRouter isFetching={isFetching} />;
};

export default PagesRouterContainer;

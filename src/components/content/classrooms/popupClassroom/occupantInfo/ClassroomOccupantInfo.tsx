import React from "react";
import { Descriptions } from "antd";
import { Classroom, Occupied, userTypes } from "../../../../../store/types";
import { userTypeColors, userTypesUA } from "../../../../../lib/constants";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AuditoriumStateType} from "../../../../../store/store";
import UserPopup from "../../../userPopup/UserPopup";
import {setShowUsersPopup} from "../../../../../store/actions";

type Props = {
  occupied: Occupied;
};

interface ParamTypes {
  userId: string;
}

const ClassroomOccupantInfo: React.FC<Props> = ({ occupied }) => {
  const { userId } = useParams<ParamTypes>();
  const occupiedUntil = new Date(occupied.until);
  const userType = occupied.user?.type as userTypes;
  const userTypeUA = userTypesUA[userType as userTypes];
  const userTypeColor = userTypeColors[userType as userTypes];
  const location = useLocation();
  const isShownPopupUser = useSelector(
      (state: AuditoriumStateType) => state.auditoriumReducer.showUserPopup
  );
  const dispatch = useDispatch();
  return (
    <div>
      <Descriptions size="small" title="Зайнято:" bordered column={1}>
        <Descriptions.Item label="До:">
          {occupiedUntil.getHours() + ":" + occupiedUntil.getMinutes()}
        </Descriptions.Item>
        <Descriptions.Item label="Ким:">
            <NavLink onClick={()=>{
              dispatch(setShowUsersPopup(true));
            }} style={{
              backgroundColor: userTypeColor,
              color: "#fff",
              padding: "3px 5px",
              borderRadius: 3,
            }} to={location.pathname+"/"+occupied.user?.id}>
              {occupied.user?.firstName + " " + occupied.user?.lastName}
            </NavLink>
          {" (" + userTypeUA + ")"}
        </Descriptions.Item>
        <Descriptions.Item label="Кафедра:">
          {occupied.user?.department}
        </Descriptions.Item>
        <Descriptions.Item label="Тел.:">
          <a href={"tel:" + occupied.user?.phoneNumber}>
            {occupied.user?.phoneNumber}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="E-mail:">
          <a href={"mailto:" + occupied.user?.email}>{occupied.user?.email}</a>
        </Descriptions.Item>
      </Descriptions>
      {isShownPopupUser ? (
          <UserPopup
              visible={isShownPopupUser}
              user={occupied.user}
          />
      ) : null}
    </div>
  );
};
export default ClassroomOccupantInfo;

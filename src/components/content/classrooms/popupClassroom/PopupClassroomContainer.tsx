import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {setClassrooms, setDisabledButton, setModalVisible} from "../../../../store/actions";
import {fetchClassroomsTC, freeClassroomTC, occupyClassroomTC} from "../../../../store/effects";
import { Classroom } from "../../../../store/types";
import { useMutation } from "@apollo/client";
import { FREE_CLASSROOM, OCCUPY_CLASSROOM } from "../../../../api/mutations";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { AuditoriumStateType } from "../../../../store/store";
import PopupClassroomFooterButtons from "./footerButtons/FooterButtons";
import PopupClassroom from "./PopupClassroom";

interface MatchParams {
  name: string;
}

interface WithRouterProps extends RouteComponentProps<MatchParams> {}

const PopupClassroomContainer: React.FC<WithRouterProps> = ({ match }) => {
  const history = useHistory();
  const classroomName = match.params.name === undefined ? 1 : match.params.name;
  const classroom = useSelector(
    (state: AuditoriumStateType) => state.classroomsReducer.classrooms
  ).find(
    (classroom: Classroom) => classroom.name === String(classroomName)
  ) as Classroom;
  const { occupied, name } = classroom;
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: AuditoriumStateType) => state.classroomsReducer.userIdValue
  );
  const isButtonDisabled = useSelector(
    (state: AuditoriumStateType) => state.classroomsReducer.disabledButton
  );
  const visible = useSelector(
    (state: AuditoriumStateType) => state.classroomsReducer.modalVisible
  );
  const untilValue = useSelector(
    (state: AuditoriumStateType) => state.classroomsReducer.untilValue
  );
  const hideModal = () => {
    dispatch(setModalVisible(false));
    dispatch(setDisabledButton(true));
    history.goBack();
  };
  const [freeClassroom, {loading, data, error}] = useMutation(FREE_CLASSROOM);
  const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM);
  const onFreeClassroom = (closeWindow: boolean) => {
    dispatch(freeClassroomTC(name, freeClassroom, closeWindow));
  };
  const onOccupyClassroom = () => {
    dispatch(occupyClassroomTC(name, userId, untilValue, occupyClassroom));
  };
  let footerButtons = (
    <PopupClassroomFooterButtons
      occupied={occupied}
      onFreeClassroom={onFreeClassroom}
      onOccupyClassroom={onOccupyClassroom}
      isButtonDisabled={isButtonDisabled}
      goBackHistory={history.goBack}
    />
  );
  return (
    <PopupClassroom
      footerButtons={footerButtons}
      hideModal={hideModal}
      classroom={classroom}
      isButtonDisabled={isButtonDisabled}
      visible={visible}
      name={name}
    />
  );
}


export default withRouter(PopupClassroomContainer);
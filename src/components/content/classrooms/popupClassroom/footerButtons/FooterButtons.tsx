import React from "react";
import { Button } from "antd";
import { Occupied } from "../../../../../store/types";

type Props = {
  occupied: Occupied | null;
  onFreeClassroom: (closeWindow: boolean) => void;
  onOccupyClassroom: () => void;
  isButtonDisabled: boolean;
  goBackHistory: () => void;
};

const PopupClassroomFooterButtons: React.FC<Props> = ({
  onFreeClassroom,
  onOccupyClassroom,
  isButtonDisabled,
  occupied,
  goBackHistory,
}) => {
  return (
    <>
      {occupied ? (
        <>
          <Button
            key="submit"
            type="primary"
            onClick={() => onFreeClassroom(false)}
          >
            Передати аудиторію
          </Button>
          <Button
            key="submit"
            type="primary"
            danger
            onClick={() => {
              goBackHistory();
              onFreeClassroom(true);
            }}
          >
            Звільнити аудиторію
          </Button>
        </>
      ) : (
        <Button
          disabled={isButtonDisabled}
          key="submit"
          type="primary"
          onClick={() => {
            goBackHistory();
            onOccupyClassroom();
          }}
        >
          Записати в аудиторію
        </Button>
      )}
    </>
  );
};

export default PopupClassroomFooterButtons;

import React from "react";
import { format } from "date-fns";
import { MdCheck, MdClose } from "react-icons/md";

import { InterviewWithUserInfo } from "../../../../@types";
import "./InvitationList.scss";

export interface invitationProps {
  interview: InterviewWithUserInfo;
}

const Invitation: React.FC<invitationProps> = ({ interview }) => {
  const name = interview.inviter.name;
  const date = format(interview.startTime, "MMMM d 'at' h:mma");

  return (
    <div className="invitation">
      <div className="invitation__left">
        <div className="invitation__name">{name}</div>
        <div className="invitation__time">{date}</div>
      </div>
      <div className="invitation__right">
        <button className="invitation__button">
          <MdClose className="timesIcon" />
        </button>
        <button className="invitation__button">
          <MdCheck className="checkIcon" />
        </button>
      </div>
    </div>
  );
};

export default Invitation;

import React from "react";
import { format } from "date-fns-tz";
import { MdCheck, MdClose } from "react-icons/md";

import { InterviewWithUserInfo } from "../../../../@types";
import "./InvitationList.scss";

export interface invitationProps {
  interview: InterviewWithUserInfo;
  handleConfirmInterview: (interviewId: string) => void;
  handleRejectInterview: (interviewId: string) => void;
}

const Invitation: React.FC<invitationProps> = ({ interview, handleConfirmInterview, handleRejectInterview }) => {
  const name = interview.inviter.name;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedTime = format(interview.startTime, "MMM d 'at' p", { timeZone });

  return (
    <div className="invitation">
      <div className="invitation__left">
        <div className="invitation__name">{name}</div>
        <div className="invitation__time">{formattedTime}</div>
      </div>
      <div className="invitation__right">
        <button className="invitation__button" onClick={() => handleRejectInterview(interview.id)}>
          <MdClose color="#e02424" size={25} />
        </button>
        <button className="invitation__button" onClick={() => handleConfirmInterview(interview.id)}>
          <MdCheck color="#31c48d" size={25} />
        </button>
      </div>
    </div>
  );
};

export default Invitation;

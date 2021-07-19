import React from "react";
import { Interview } from "@prisma/client";
import { format } from "date-fns";
import { MdCheck, MdClose } from "react-icons/md";

import "./Invitation.css";

export interface invitationProps {
  interview: Interview;
}

const Invitation: React.FC<invitationProps> = ({ interview }) => {
  //TODO: change id to user name
  const name = interview.inviterId;
  const date = format(interview.startTime, "MMMM d") + " at " + format(interview.startTime, "h:00a");
  return (
    <div className="box">
      <div className="name">{name}</div>
      <div className="time">{date}</div>
      <div className="iconGroup">
        <button className="button">
          <MdClose size={25} color="#e02424" />
        </button>
        <button className="button">
          <MdCheck size={25} color="#31c48d" />
        </button>
      </div>
    </div>
  );
};

export default Invitation;

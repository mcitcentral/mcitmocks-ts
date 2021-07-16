import React, { useState } from "react";
import "./TimeBlock.scss";
import { FaRegCalendar, FaRegEnvelope, FaInbox } from "react-icons/fa";
import { format } from "date-fns";
import { Interview } from "../Day/Day";
import { User } from "../Day/Day";

export interface timeProps {
  startTime: Date;
  interview: Interview | undefined;
  availability: Date | undefined;
}

const TimeBlock: React.FC<timeProps> = ({ interview, startTime, availability }) => {
  //const curUser = useSelector((state: RootState) => state.auth.user);
  const curUser: User = { id: "a", email: "xx@gmail.com", timeZone: "American/New York", name: "Michael Jackson" };
  const hourStr = format(startTime, "HH");
  const period = format(startTime, "aa");
  let status = "";
  let msg = "";
  let icon: any = null;
  if (availability !== undefined) {
    msg = "I'm available";
    status = "AVAILABLE";
  } else if (interview !== undefined) {
    status = interview.status;
    icon =
      status === "CONFIRMED" ? <FaRegCalendar /> : interview.inviterId === curUser.id ? <FaRegEnvelope /> : <FaInbox />;
    msg = interview.inviterId === curUser.id ? interview.invitee.name : interview.inviter.name;
  } else {
    status = "NAVAILABLE";
  }

  return (
    <button className="calendar-out" data-type={status}>
      <div className="calendar-rectangle"></div>
      <div className="calendar-event-info">
        <div className="calendar-event-time">
          {hourStr}:00 {period}
        </div>
        <div className="calendar-event-icon">{icon}</div>
        <div className="calendar-event-title">{msg}</div>
      </div>
    </button>
  );
};

export default TimeBlock;

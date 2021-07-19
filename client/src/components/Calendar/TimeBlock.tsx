import React from "react";
import { FaRegCalendar, FaRegEnvelope, FaInbox } from "react-icons/fa";
import { format } from "date-fns";
import { User, Interview } from "@prisma/client";

import "./Calendar.scss";

export interface timeProps {
  startTime: Date;
  interview?: Interview & { inviter: User; invitee: User };
  isAvailable?: boolean;
  user: User;
  toggleAvailability: (startTime: Date) => void;
}

const TimeBlock: React.FC<timeProps> = ({ interview, startTime, isAvailable, user, toggleAvailability }) => {
  const handleClick = async () => {
    // TODO: Figure out disabled conditions
    toggleAvailability(startTime);
  };

  const renderStatus = () => {
    if (interview) return interview.status;
    if (isAvailable) return "AVAILABLE";
    return "UNAVAILABLE";
  };

  const renderIcon = () => {
    if (interview?.status === "CONFIRMED") return <FaRegCalendar />;
    if (interview?.status === "INVITED" && interview.inviterId === user.id) return <FaRegEnvelope />;
    if (interview?.status === "INVITED" && interview.inviteeId === user.id) return <FaInbox />;
    return null;
  };

  const renderMessage = () => {
    if (interview?.status === "CONFIRMED" || interview?.status === "INVITED") {
      if (interview.inviterId === user.id) return interview.invitee.name;
      if (interview.inviteeId === user.id) return interview.inviter.name;
      return null;
    }
    if (isAvailable) return "I'm available";
    return null;
  };

  return (
    <button className="timeblock" data-type={renderStatus()} onClick={handleClick}>
      <div className="timeblock__top">
        <div className="timeblock__time">{format(startTime, "h:mm aa")}</div>
        <div className="timeblock__icon">{renderIcon()}</div>
      </div>
      <div className="timeblock__bottom">
        <div className="timeblock__message">{renderMessage()}</div>
      </div>
    </button>
  );
};

export default TimeBlock;

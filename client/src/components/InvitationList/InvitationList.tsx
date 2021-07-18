import React from "react";

import { InterviewWithUserInfo } from "../../../../@types";
import Invitation from "./Invitation";
import "./InvitationList.scss";

interface InvitationListProps {
  invitations: InterviewWithUserInfo[];
}

const InvitationList: React.FC<InvitationListProps> = ({ invitations }) => {
  return (
    <div className="invitationList">
      <div style={{ fontFamily: "IBM Plex Mono", fontStyle: "normal", fontSize: "12px", lineHeight: "16px" }}>
        INVITATIONS
      </div>
      <div>
        {invitations.map((item) => (
          <Invitation interview={item} />
        ))}
      </div>
    </div>
  );
};

export default InvitationList;

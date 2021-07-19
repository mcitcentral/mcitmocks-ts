import React, { MutableRefObject } from "react";

import { InterviewWithUserInfo } from "../../../../@types";
import Invitation from "./Invitation";
import "./InvitationList.scss";

interface InvitationListProps {
  invitations: InterviewWithUserInfo[];
}

const InvitationList: React.ForwardRefRenderFunction<HTMLDivElement, InvitationListProps> = ({ invitations }, ref) => {
  return (
    <div ref={ref} className="invitationList">
      <div style={{ fontFamily: "IBM Plex Mono", fontStyle: "normal", fontSize: "12px", lineHeight: "16px" }}>
        INVITATIONS
      </div>
      <div>
        {invitations.map((item) => (
          <Invitation key={item.id} interview={item} />
        ))}
      </div>
    </div>
  );
};

export default React.forwardRef(InvitationList);

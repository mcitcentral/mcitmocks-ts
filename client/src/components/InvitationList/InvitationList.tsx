import React from "react";

import { InterviewWithUserInfo } from "../../../../@types";
import Invitation from "./Invitation";
import "./InvitationList.scss";

interface InvitationListProps {
  invitations: InterviewWithUserInfo[];
  handleConfirmInterview: (interviewId: string) => void;
  handleRejectInterview: (interviewId: string) => void;
}

const InvitationList: React.ForwardRefRenderFunction<HTMLDivElement, InvitationListProps> = (
  { invitations, handleConfirmInterview, handleRejectInterview },
  ref
) => {
  return (
    <div ref={ref} className="invitationList">
      <div className="invitationList__title">INVITATIONS</div>
      <div>
        {invitations.map((item) => (
          <Invitation
            key={item.id}
            interview={item}
            handleConfirmInterview={handleConfirmInterview}
            handleRejectInterview={handleRejectInterview}
          />
        ))}
      </div>
    </div>
  );
};

export default React.forwardRef(InvitationList);

import { useState } from "react";
import { Interview, User, InterviewStatus } from "@prisma/client";
import { format, add, sub, isAfter, isBefore } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { FcCancel } from "react-icons/fc";

import CodingLanguageTag from "../CodingLanguageTag/CodingLanguageTag";
import QuestionDifficultyTag from "../QuestionDifficultyTag";
import QuestionTypeTag from "../QuestionTypeTag/QuestionTypeTag";
import "./InterviewCard.scss";

interface InterviewWithUsers extends Interview {
  inviter: Partial<User>;
  invitee: Partial<User>;
}

export interface InterviewCardProps {
  user: User;
  interview: InterviewWithUsers;
  handleCancelInterview: (interviewId: string) => Promise<void>;
}

const interviewStatusMap = {
  [InterviewStatus.NOT_INITIALIZED]: "Pending",
  [InterviewStatus.CANCELLED]: "Cancelled",
  [InterviewStatus.CONFIRMED]: "Confirmed",
  [InterviewStatus.INVITED]: "Pending",
  [InterviewStatus.COMPLETED]: "Completed",
};

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, user, handleCancelInterview }) => {
  const [isCancelActive, setIsCancelActive] = useState<boolean>(false);
  const startTimeLocal = utcToZonedTime(interview.startTime, user.timeZone);
  const otherUser = interview.inviteeId === user.id ? interview.inviter : interview.invitee;
  const isInterviewNow =
    isAfter(new Date(), sub(interview.startTime, { minutes: 15 })) &&
    isBefore(new Date(), add(interview.startTime, { minutes: 75 }));

  return (
    <div className="interviewCard">
      <div className="interviewCard__image">
        {otherUser.imageUrl && <img src={otherUser.imageUrl} alt="User Avatar" />}
      </div>
      <div className="interviewCard__left">
        <div className="interviewCard__leftTop">
          <h3 className="interviewCard__name">{otherUser.name}</h3>
          <p className="interviewCard__time">{format(startTimeLocal, "MMM d, yyyy @ h:mm a")}</p>
        </div>
        <div className="interviewCard__tags">
          <QuestionDifficultyTag difficulty={otherUser.questionDifficulty!} />
          {otherUser.codingLanguage?.map((language) => (
            <CodingLanguageTag language={language} />
          ))}
          {otherUser.questionTypes?.map((type) => (
            <QuestionTypeTag type={type} />
          ))}
        </div>
      </div>
      <div className="interviewCard__right">
        <button className="interviewCard__cancel" disabled={isInterviewNow} onClick={() => setIsCancelActive(true)}>
          <FcCancel size={20} />
        </button>
        <button className="interviewCard__status" disabled={!isInterviewNow} data-status={interview.status}>
          {isInterviewNow ? "JOIN" : interviewStatusMap[interview.status]}
        </button>
      </div>
      {isCancelActive && (
        <div className="interviewCardPopup">
          <p>Are you sure you want to cancel this interview?</p>
          <div className="interviewCardPopup__buttons">
            <button className="interviewCardPopup__no" onClick={() => setIsCancelActive(false)}>
              No, go back
            </button>
            <button className="interviewCardPopup__yes" onClick={() => handleCancelInterview(interview.id)}>
              Yes, cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewCard;

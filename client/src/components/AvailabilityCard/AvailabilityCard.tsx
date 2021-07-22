import { Availability } from "@prisma/client";
import { format } from "date-fns-tz";
import { useState } from "react";
import { RiMailLine, RiMailSendLine } from "react-icons/ri";

import { UserPublic } from "../../../../@types";
import CodingLanguageTag from "../CodingLanguageTag/CodingLanguageTag";
import QuestionDifficultyTag from "../QuestionDifficultyTag";
import QuestionTypeTag from "../QuestionTypeTag/QuestionTypeTag";
import "./AvailabilityCard.scss";

export interface AvailabilityCardProps {
  availability: Availability & { user: UserPublic };
  handleSendInvitation: (availabilityId: string) => void;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ availability, handleSendInvitation }) => {
  const [isInvitationSent, setIsInvitationSent] = useState<boolean>(false);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedTime = format(availability.startTime, "MMMM d 'at' p", { timeZone });

  const sendInvitation = () => {
    handleSendInvitation(availability.id);
    setIsInvitationSent(true);
  };

  return (
    <div className="availabilityCard">
      <div className="availabilityCard__image">
        {availability.user.imageUrl && <img src={availability.user.imageUrl} alt="User Avatar" />}
      </div>
      <div className="availabilityCard__main">
        <p>
          <strong>{availability.user.name}</strong> is available on <br />
          <strong>{formattedTime}</strong>
        </p>
        <div className="availabilityCard__tags">
          <QuestionDifficultyTag difficulty={availability.user.questionDifficulty!} />
          {availability.user.codingLanguage?.map((language) => (
            <CodingLanguageTag key={language} language={language} />
          ))}
          {availability.user.questionTypes?.map((type) => (
            <QuestionTypeTag key={type} type={type} />
          ))}
        </div>
      </div>
      <div className="availabilityCard__action">
        <button className="availabilityCard__actionButton" disabled={isInvitationSent} onClick={sendInvitation}>
          {isInvitationSent ? <RiMailSendLine color="white" size={30} /> : <RiMailLine color="white" size={30} />}
        </button>
      </div>
    </div>
  );
};

export default AvailabilityCard;

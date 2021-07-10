import { QuestionType } from "@prisma/client";
import "./QuestionTypeTag.scss";

export interface QuestionTypeTagProps {
  type: QuestionType;
}

const QuestionTypeTag: React.FC<QuestionTypeTagProps> = ({ type }) => {
  return <span className="questionTypeTag">{type}</span>;
};

export default QuestionTypeTag;

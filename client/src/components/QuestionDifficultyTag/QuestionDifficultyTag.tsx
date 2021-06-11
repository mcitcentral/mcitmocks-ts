import { QuestionDifficulty } from "@prisma/client";
import "./QuestionDifficultyTag.scss";

export interface QuestionDifficultyTagProps {
  difficulty: QuestionDifficulty;
}

const QuestionDifficultyTag: React.FC<QuestionDifficultyTagProps> = ({ difficulty }) => {
  return (
    <span className="questionDifficultyTag" data-type={difficulty}>
      {difficulty}
    </span>
  );
};

export default QuestionDifficultyTag;

import { useState } from "react";
import { InterviewQuestion, QuestionType } from "@prisma/client";
import showdown from "showdown";

import QuestionDifficultyTag from "../QuestionDifficultyTag";
import QuestionTypeTag from "../QuestionTypeTag/QuestionTypeTag";
import "./QuestionSidebar.scss";

export interface QuestionSidebarProps {
  question: InterviewQuestion;
  isInterviewer: boolean;
}

const QuestionSidebar: React.FC<QuestionSidebarProps> = ({ question, isInterviewer }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const toggleShowAnswer = () => setShowAnswer((prev) => !prev);

  const mdConverter = new showdown.Converter();
  const questionHtml = mdConverter.makeHtml(question.questionText);
  const answerHtml = mdConverter.makeHtml(question.answerText);

  return (
    <div className="questionSidebar">
      <div className="questionSidebar__top">
        <h3>QUESTION</h3>
        {isInterviewer && (
          <button className="questionSidebar__toggleAnswerButton" onClick={toggleShowAnswer}>
            {showAnswer ? "Toggle Question" : "Toggle Answer"}
          </button>
        )}
      </div>
      <h2>{question.questionName}</h2>
      <div className="questionSidebar__tags">
        <QuestionDifficultyTag difficulty={question.questionDifficulty} />
        {question.questionType.map((type: QuestionType) => (
          <QuestionTypeTag key={type} type={type} />
        ))}
      </div>
      <hr />
      {showAnswer ? (
        <div className="questionSidebar__content" dangerouslySetInnerHTML={{ __html: answerHtml }} />
      ) : (
        <div className="questionSidebar__content" dangerouslySetInnerHTML={{ __html: questionHtml }} />
      )}
    </div>
  );
};

export default QuestionSidebar;

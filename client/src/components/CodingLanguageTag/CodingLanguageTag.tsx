import { CodingLanguage } from "@prisma/client";
import "./CodingLanguageTag.scss";
import { FaPython, FaCode, FaJava } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

export interface CodingLanguageTagProps {
  language: CodingLanguage;
}

const CodingLanguageTag: React.FC<CodingLanguageTagProps> = ({ language }) => {
  const QuestionTypeTagIcon = () => {
    if (language === CodingLanguage.PYTHON) return <FaPython />;
    if (language === CodingLanguage.JAVASCRIPT) return <SiJavascript />;
    if (language === CodingLanguage.JAVA) return <FaJava />;
    return <FaCode />;
  };

  return (
    <span className="codingLanguageTag">
      <QuestionTypeTagIcon />
      {language}
    </span>
  );
};

export default CodingLanguageTag;

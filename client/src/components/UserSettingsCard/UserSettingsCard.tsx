import { useState } from "react";
import Select from "react-select";
import { User, CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { MdEdit, MdSave } from "react-icons/md";
import { UserPreferences } from "../../../../@types";
import "./UserSettingsCard.scss";
import QuestionDifficultyTag from "../QuestionDifficultyTag";
import CodingLanguageTag from "../CodingLanguageTag/CodingLanguageTag";
import QuestionTypeTag from "../QuestionTypeTag/QuestionTypeTag";

const languageOptions = Object.values(CodingLanguage).map((val) => ({ value: val, label: val }));
const difficultyOptions = Object.values(QuestionDifficulty).map((val) => ({ value: val, label: val }));
const questionTypeOptions = Object.values(QuestionType).map((val) => ({ value: val, label: val }));

export interface UserSettingsCardProps {
  user: User;
  handleUpdateSettings: (prefs: Partial<UserPreferences>) => Promise<void>;
}

const UserSettingsCard: React.FC<UserSettingsCardProps> = ({ user, handleUpdateSettings }) => {
  const [questionDifficulty, setQuestionDifficulty] = useState<QuestionDifficulty>(user.questionDifficulty);
  const [codingLanguage, setCodingLanguage] = useState<CodingLanguage[]>(user.codingLanguage);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(user.questionTypes);
  const [editMode, setEditMode] = useState<boolean>(false);
  const toggleEditMode = () => setEditMode((prev) => !prev);

  const handleSave = async () => {
    await handleUpdateSettings({ questionDifficulty, codingLanguage, questionTypes });
    setEditMode(false);
  };

  return (
    <div className="userSettingsCard">
      <div className="userSettingsCard__settingName">EMAIL</div>
      <div className="userSettingsCard__text">{user.email}</div>
      <div className="userSettingsCard__settingName">CODING LANGUAGES</div>
      {editMode ? (
        <Select
          isMulti
          className="userSettingsCard__select"
          value={languageOptions.filter(({ value }) => codingLanguage.includes(value))}
          options={languageOptions}
          onChange={(values) => setCodingLanguage(values.map(({ value }) => value))}
        />
      ) : (
        <div className="userSettingsCard__tags">
          {codingLanguage.map((language) => (
            <CodingLanguageTag key={language} language={language} />
          ))}
        </div>
      )}
      <div className="userSettingsCard__settingName">DIFFICULTY</div>
      {editMode ? (
        <Select
          className="userSettingsCard__select"
          value={difficultyOptions.find(({ value }) => questionDifficulty === value)}
          options={difficultyOptions}
          onChange={({ value }) => setQuestionDifficulty(value)}
        />
      ) : (
        <div>
          <QuestionDifficultyTag difficulty={questionDifficulty} />
        </div>
      )}
      <div className="userSettingsCard__settingName">QUESTION TYPES</div>
      {editMode ? (
        <Select
          isMulti
          className="userSettingsCard__select"
          value={questionTypeOptions.filter(({ value }) => questionTypes.includes(value))}
          options={questionTypeOptions}
          onChange={(values) => setQuestionTypes(values.map(({ value }) => value))}
        />
      ) : (
        <div className="userSettingsCard__tags">
          {questionTypes.map((questionType) => (
            <QuestionTypeTag key={questionType} type={questionType} />
          ))}
        </div>
      )}

      {editMode ? (
        <button className="userSettingsCard__editbutton" onClick={handleSave}>
          <MdSave size={20} />
        </button>
      ) : (
        <button className="userSettingsCard__editbutton" onClick={toggleEditMode}>
          <MdEdit size={20} />
        </button>
      )}
    </div>
  );
};

export default UserSettingsCard;

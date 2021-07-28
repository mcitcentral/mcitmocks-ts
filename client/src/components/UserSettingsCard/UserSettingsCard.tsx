import { useState } from "react";
import Select from "react-select";
import { User, CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { FiEdit3 } from "react-icons/fi";
import { UserPreferences } from "../../../../@types";
import "./UserSettingsCard.scss";

const languageOptions = [
  { value: CodingLanguage.PYTHON, label: CodingLanguage.PYTHON },
  { value: CodingLanguage.JAVASCRIPT, label: CodingLanguage.JAVASCRIPT },
  { value: CodingLanguage.JAVA, label: CodingLanguage.JAVA },
];

const difficultyOptions = [
  { value: QuestionDifficulty.EASY, label: QuestionDifficulty.EASY },
  { value: QuestionDifficulty.MEDIUM, label: QuestionDifficulty.MEDIUM },
  { value: QuestionDifficulty.HARD, label: QuestionDifficulty.HARD },
];

const questionTypeOptions = [
  { value: QuestionType.ARRAY, label: QuestionType.ARRAY },
  { value: QuestionType.LINKED_LIST, label: QuestionType.LINKED_LIST },
];

export interface UserSettingsProps {
  user: User;
  handleUpdateSettings: (id: string, prefs: Partial<UserPreferences>) => Promise<void>;
}

const UserSettingsCard: React.FC<UserSettingsProps> = ({ user, handleUpdateSettings }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="userSettingsCard">
      <div className="userSettingsCard__settingName">EMAIL</div>
      <div className="userSettingsCard__text">{user.email}</div>
      <div className="userSettingsCard__settingName">CODING LANGUAGES</div>
      <Select
        isMulti
        defaultValue={user.codingLanguage}
        options={languageOptions}
        onChange={(values) => handleUpdateSettings(user.id, values)}
      />
      <div className="userSettingsCard__settingName">DIFFICULTY</div>
      <Select
        defaultValue={user.questionDifficulty}
        options={difficultyOptions}
        onChange={(values) => handleUpdateSettings(user.id, values)}
      />
      <div className="userSettingsCard__settingName">QUESTION TYPES</div>
      <Select
        isMulti
        defaultValue={user.questionTypes}
        options={questionTypeOptions}
        onChange={(values) => handleUpdateSettings(user.id, values)}
      />
      <div className="userSettingsCard__editbutton">{editMode ? <div>save</div> : <FiEdit3 />}</div>
    </div>
  );
};

export default UserSettingsCard;

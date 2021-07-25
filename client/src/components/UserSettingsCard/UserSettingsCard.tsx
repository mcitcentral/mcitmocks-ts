import { useState } from "react";
import Select from "react-select";
import { Interview, User, InterviewStatus, CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { FcCancel } from "react-icons/fc";

import CodingLanguageTag from "../CodingLanguageTag/CodingLanguageTag";
import QuestionDifficultyTag from "../QuestionDifficultyTag";
import QuestionTypeTag from "../QuestionTypeTag/QuestionTypeTag";
import { userInfo } from "os";
import { UserPreferences } from "../../../../@types";

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
  return (
    <div className="userSettingsCard">
      <div className="userSetting">EMAIL</div>
      <div className="fixedUserData">{user.email}</div>
      <div className="userSetting">CODING LANGUAGES</div>
      <Select
        isMulti
        defaultValue={user.codingLanguage}
        options={languageOptions}
        onChange={(values) => handleUpdateSettings(user.id, values)}
      />
      <div className="userSetting">DIFFICULTY</div>
      <Select
        defaultValue={user.questionDifficulty}
        options={difficultyOptions}
        onChange={(values) => handleUpdateSettings(user.id, values)}
      />
      <div className="userSetting">QUESTION TYPES</div>
      <Select
        isMulti
        defaultValue={user.questionTypes}
        options={questionTypeOptions}
        onChange={(values) => handleUpdateSettings(user.id, values)}
      />
    </div>
  );
};

export default UserSettingsCard;

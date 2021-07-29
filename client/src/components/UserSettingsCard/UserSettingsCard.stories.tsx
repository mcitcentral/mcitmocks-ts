import UserSettingsCard, { UserSettingsCardProps } from "./UserSettingsCard";
import { Story } from "@storybook/react";
import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";

export default {
  title: "UserSettingsCard",
  component: UserSettingsCard,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<UserSettingsCardProps> = (args) => <UserSettingsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    id: "1",
    imageUrl: "test",
    name: "John",
    email: "john@gmail.com",
    timeZone: "America/New_York",
    questionTypes: [QuestionType.ARRAY],
    questionDifficulty: QuestionDifficulty.EASY,
    codingLanguage: [CodingLanguage.JAVASCRIPT],
  },
};

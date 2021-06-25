import InterviewCard, { InterviewCardProps } from "./InterviewCard";
import { Story } from "@storybook/react";
import { CodingLanguage, InterviewStatus, QuestionDifficulty, QuestionType } from "@prisma/client";

export default {
  title: "InterviewCard",
  component: InterviewCard,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<InterviewCardProps> = (args) => <InterviewCard {...args} />;

export const Confirmed = Template.bind({});
Confirmed.args = {
  interview: {
    id: "abc-def-ghi",
    inviteeId: "1",
    invitee: {
      name: "John",
      email: "john@gmail.com",
      timeZone: "America/New_York",
      questionTypes: [QuestionType.ARRAY],
      questionDifficulty: QuestionDifficulty.EASY,
      codingLanguage: [CodingLanguage.JAVASCRIPT],
    },
    inviterId: "2",
    inviter: {
      name: "Bob",
      email: "bob@gmail.com",
      imageUrl: "https://picsum.photos/200",
      timeZone: "America/New_York",
      questionTypes: [QuestionType.ARRAY],
      questionDifficulty: QuestionDifficulty.EASY,
      codingLanguage: [CodingLanguage.JAVASCRIPT],
    },
    startTime: new Date(),
    status: InterviewStatus.CONFIRMED,
  },
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

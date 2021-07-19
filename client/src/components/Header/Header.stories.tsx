import Header, { HeaderProps } from "./Header";
import { Story } from "@storybook/react";
import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";

export default {
  title: "Header",
  component: Header,
  argTypes: {
    onLogin: { action: "login" },
  },
};

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = { isAuthenticated: false, invitations: [] };

export const Authenticated = Template.bind({});
Authenticated.args = {
  isAuthenticated: true,
  invitations: [
    {
      id: "000",
      inviterId: "John Smith",
      inviteeId: "b",
      status: "INVITED",
      startTime: new Date(),
      invitee: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
      inviter: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
    },
    {
      id: "001",
      inviterId: "John Smith",
      inviteeId: "b",
      status: "INVITED",
      startTime: new Date(),
      invitee: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
      inviter: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
    },
    {
      id: "002",
      inviterId: "John Smith",
      inviteeId: "b",
      status: "INVITED",
      startTime: new Date(),
      invitee: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
      inviter: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
    },
    {
      id: "003",
      inviterId: "John Smith",
      inviteeId: "b",
      status: "INVITED",
      startTime: new Date(),
      invitee: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
      inviter: {
        name: "John",
        imageUrl: "https://picsum.photos/200",
        questionTypes: [QuestionType.ARRAY],
        questionDifficulty: QuestionDifficulty.EASY,
        codingLanguage: [CodingLanguage.JAVASCRIPT],
      },
    },
  ],
};

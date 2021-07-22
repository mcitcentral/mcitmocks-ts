import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { Story } from "@storybook/react";
import { ComponentProps } from "react";
import InvitationList from "./InvitationList";

export default {
  title: "InvitationList",
  component: InvitationList,
};

const Template: Story<ComponentProps<typeof InvitationList>> = (args) => <InvitationList {...args} />;

export const InvitationGroup = Template.bind({});
InvitationGroup.args = {
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
  ],
};

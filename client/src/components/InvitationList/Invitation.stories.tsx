import { Story } from "@storybook/react";
import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { ComponentProps } from "react";

import Invitation from "./Invitation";

export default {
  title: "Invitation",
  component: Invitation,
};

const Template: Story<ComponentProps<typeof Invitation>> = (args) => <Invitation {...args} />;

export const Invitation1 = Template.bind({});

Invitation1.args = {
  interview: {
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
};

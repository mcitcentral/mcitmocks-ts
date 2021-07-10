import QuestionDifficultyTag, { QuestionDifficultyTagProps } from "./QuestionDifficultyTag";
import { Story } from "@storybook/react";
import { QuestionDifficulty } from "@prisma/client";

export default {
  title: "QuestionDifficultyTag",
  component: QuestionDifficultyTag,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<QuestionDifficultyTagProps> = (args) => <QuestionDifficultyTag {...args} />;

export const Easy = Template.bind({});
Easy.args = { difficulty: QuestionDifficulty.EASY };

export const Medium = Template.bind({});
Medium.args = { difficulty: QuestionDifficulty.MEDIUM };

export const Hard = Template.bind({});
Hard.args = { difficulty: QuestionDifficulty.HARD };

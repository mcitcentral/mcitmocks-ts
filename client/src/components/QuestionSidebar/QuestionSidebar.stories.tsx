import QuestionSidebar, { QuestionSidebarProps } from "./QuestionSidebar";
import { Story } from "@storybook/react";
import { QuestionDifficulty, QuestionType } from "@prisma/client";

export default {
  title: "QuestionSidebar",
  component: QuestionSidebar,
};

const Template: Story<QuestionSidebarProps> = (args) => <QuestionSidebar {...args} />;

export const Interviewee = Template.bind({});
Interviewee.args = {
  question: {
    id: "0001",
    questionName: "Two Sum",
    questionDifficulty: QuestionDifficulty.EASY,
    questionType: [QuestionType.ARRAY, QuestionType.LINKED_LIST],
    questionText:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n### Example Input\n\n```\nint[] nums = [1, 2, 3, 4];\nint target = 7;\n\n// Expected Output:\ntwoSum(nums, target);\nint[] expected = [2, 3];\n```",
    answerText:
      "\n1. Did the interviewee just provide a brute force solution? If so, push them to think of a more optimized approach that could solve this in O(n).",
  },
  isInterviewer: false,
};

export const Interviewer = Template.bind({});
Interviewer.args = {
  ...Interviewee.args,
  isInterviewer: true,
};

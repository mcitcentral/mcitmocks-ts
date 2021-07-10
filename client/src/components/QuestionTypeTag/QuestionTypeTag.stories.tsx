import QuestionTypeTag, { QuestionTypeTagProps } from "./QuestionTypeTag";
import { Story } from "@storybook/react";
import { QuestionType } from "@prisma/client";

export default {
  title: "QuestionTypeTag",
  component: QuestionTypeTag,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<QuestionTypeTagProps> = (args) => <QuestionTypeTag {...args} />;

export const Default = Template.bind({});
Default.args = { type: QuestionType.ARRAY };

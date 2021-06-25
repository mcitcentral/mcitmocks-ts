import CodingLanguageTag, { CodingLanguageTagProps } from "./CodingLanguageTag";
import { Story } from "@storybook/react";
import { CodingLanguage } from "@prisma/client";

export default {
  title: "CodingLanguageTag",
  component: CodingLanguageTag,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<CodingLanguageTagProps> = (args) => <CodingLanguageTag {...args} />;

export const Java = Template.bind({});
Java.args = { language: CodingLanguage.JAVA };

export const Javascript = Template.bind({});
Javascript.args = { language: CodingLanguage.JAVASCRIPT };

export const Python = Template.bind({});
Python.args = { language: CodingLanguage.PYTHON };

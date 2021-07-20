import { Story } from "@storybook/react";
import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";
import { ComponentProps } from "@reach/router/node_modules/@types/react";
import IndexTopLeft from "./IndexTopLeft";
import React from "react";

export default {
  title: "IndexTopLeft",
  component: IndexTopLeft,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<ComponentProps<typeof IndexTopLeft>> = (args) => <IndexTopLeft {...args} />;

export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = { isAuthenticated: false };

export const Authenticated = Template.bind({});
Authenticated.args = { isAuthenticated: true };

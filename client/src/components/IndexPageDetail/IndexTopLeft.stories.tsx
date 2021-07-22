import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import IndexTopLeft from "./IndexTopLeft";

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

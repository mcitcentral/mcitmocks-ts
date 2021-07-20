import { Story } from "@storybook/react";
import { ComponentProps } from "@reach/router/node_modules/@types/react";
import IndexPageDetail from "./IndexPageDetail";
import React from "react";

export default {
  title: "IndexPageDetail",
  component: IndexPageDetail,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<ComponentProps<typeof IndexPageDetail>> = (args) => <IndexPageDetail {...args} />;


export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = { isAuthenticated: false };

export const Authenticated = Template.bind({});
Authenticated.args = { isAuthenticated: true };



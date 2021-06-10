import Header, { HeaderProps } from "./Header";
import { Story } from "@storybook/react";

export default {
  title: "Header",
  component: Header,
  argTypes: {
    onLogin: { action: "login" },
  },
};

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = { isAuthenticated: false };

export const Authenticated = Template.bind({});
Authenticated.args = { isAuthenticated: true };

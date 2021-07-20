
import { Story } from "@storybook/react";
import { ComponentProps } from "react";
import IndexTopRight from "./IndexTopRight";

export default {
  title: "IndexTopRight",
  component: IndexTopRight,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<ComponentProps<typeof IndexTopRight>> = (args) => <IndexTopRight {...args} />;

export const Current = Template.bind({});
Current.args = {
};

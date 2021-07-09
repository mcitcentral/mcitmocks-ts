
import { Story } from "@storybook/react";
import { Interview, QuestionDifficulty } from "@prisma/client";
import Invitation from "./Invitation";
import { ComponentProps } from "react";

export default {
  title: "Invitation",
  component: Invitation,
};

const Template: Story<ComponentProps<typeof Invitation>> = (args) => <Invitation {...args} />;

export const Invitation1 = Template.bind({});
Invitation1.args = { 
  interview: {
    id: '001',
    inviterId: 'John Smith',
    inviteeId: 'b',
    status: 'INVITED',
    startTime: new Date(),
  }
    
};


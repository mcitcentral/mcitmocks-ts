
import { Story } from "@storybook/react";
import { Interview, QuestionDifficulty } from "@prisma/client";
import Invitation from "./Invitation";
import { ComponentProps } from "react";
import InvitationList from "./InvitationList";

export default {
  title: "InvitationList",
  component: InvitationList,
};

const Template: Story<ComponentProps<typeof InvitationList>> = (args) => <InvitationList {...args} />;

export const InvitationGroup = Template.bind({});
InvitationGroup.args =  {
    invitations:[
        {
            id: '000', 
            inviterId: 'John Smith',
            inviteeId: 'b',
            status: 'INVITED',
            startTime: new Date(),
        },
        {
            id: '000', 
            inviterId: 'John Smith',
            inviteeId: 'b',
            status: 'INVITED',
            startTime: new Date(),
        },
        {
            id: '000', 
            inviterId: 'John Smith',
            inviteeId: 'b',
            status: 'INVITED',
            startTime: new Date(),
        },
        {
            id: '000', 
            inviterId: 'John Smith',
            inviteeId: 'b',
            status: 'INVITED',
            startTime: new Date(),
        }
    ]
};

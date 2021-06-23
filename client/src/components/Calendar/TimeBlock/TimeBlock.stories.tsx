// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import  TimeBlock  from './TimeBlock';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'TimeBlock',
  component: TimeBlock,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof TimeBlock>> = (args) => <TimeBlock {...args} />;

export const Available = Template.bind({});
Available.args = {
  /*👇 The args you need here will depend on your component */
  startTime: new Date(),
  interview: undefined,
  availability: new Date(),

};

export const NullAvail = Template.bind({});
NullAvail.args = {
    startTime: new Date(),
    interview: undefined,
    availability: undefined,
}

export const Confirmed = Template.bind({});
Confirmed.args = {
    startTime: new Date(),
    interview: {
      id: '000',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'CONFIRMED',
    },
    availability: undefined,
}

export const ReceivedFrom = Template.bind({});
ReceivedFrom.args = {
    startTime: new Date(),
    interview: {
      id: '001',
      inviteeId: 'a', // Represents inviter
      invitee: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviterId: 'b',
      inviter: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'INVITED',
    },
    availability: undefined,
}

export const Invited = Template.bind({});
Invited.args = {
    startTime: new Date(),
    interview: {
      id: '002',
      inviterId: 'a', // Represents inviter
      inviter: {
        id: 'a',
        name: 'Michael Jackson',
        timeZone: 'America/New York',
        email: 'xx@gmail.com'
      },
      inviteeId: 'b',
      invitee: {
        id: 'b',
        name: 'John Smith',
        timeZone: 'America/New York',
        email: 'yy@gmail.com'
      }, // Represents invitee
      startTime: new Date().toISOString(), // ISO DateTime string in UTC (on the hour)
      status: 'INVITED',
    },
    availability: undefined,
}
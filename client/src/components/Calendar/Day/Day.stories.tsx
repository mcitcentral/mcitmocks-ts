// YourComponent.stories.tsx

import React, { ComponentProps } from 'react';

import { Story } from '@storybook/react';

import  Day  from './Day';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Day',
  component: Day,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Day>> = (args) => <Day {...args} />;

export const day1 = Template.bind({});
day1.args = {
  /*👇 The args you need here will depend on your component */
  date: new Date(2021,5,17),
  availableTime: new Map([[2,new Date(2021,5,17,2)],[3,new Date(2021,5,17,3)]]),
  confirmedInterviews: new Map([[6,{
    id: '001',
    status: 'CONFIRMED',
    inviterId: 'a', // Represents inviter
    inviteeId: 'b', // Represents invitee
    startTime: '2021-06-16T05:00:00.000Z', // ISO DateTime string in UTC (on the hour)
    isConfirmed: true,
 }]]),
  invitedInterviews:new Map([[7,{
    id: '002',
    status: 'INVITED',
    inviterId: 'a', // Represents inviter
    inviteeId: 'b', // Represents invitee
    startTime: '2021-06-16T07:00:00.000Z', // ISO DateTime string in UTC (on the hour)
    isConfirmed: false,
  }]]),
  receivedInterviews:new Map([[8,{
    id: '003',
    status: 'INVITED',
    inviterId: 'c', // Represents inviter
    inviteeId: 'b',
    startTime: '2021-06-16T08:00:00.000Z', // ISO DateTime string in UTC (on the hour)
    isConfirmed: false,
  }]])
};


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
  isAvailable: true
};

export const NullAvail = Template.bind({});
NullAvail.args = {
    startTime: new Date(),
    isAvailable:false,
}

export const Confirmed = Template.bind({});
Confirmed.args = {
    startTime: new Date(),
    isConfirmed: true,
    withWhom: 'John Smith'
}

export const ReceivedFrom = Template.bind({});
ReceivedFrom.args = {
    startTime: new Date(),
    withWhom:'John Smith'
}

export const Invited = Template.bind({});
Invited.args = {
    startTime: new Date(),
    isAvailable: null,
    asInviter: true,
    withWhom:'John Smith'
}
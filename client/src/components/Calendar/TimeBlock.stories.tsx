import { ComponentProps } from "react";

import { Story } from "@storybook/react";

import TimeBlock from "./TimeBlock";

export default {
  title: "TimeBlock",
  component: TimeBlock,
};

const Template: Story<ComponentProps<typeof TimeBlock>> = (args) => <TimeBlock {...args} />;

export const Available = Template.bind({});
Available.args = {
  startTime: new Date(),
  interview: undefined,
  isAvailable: true,
};

export const NullAvail = Template.bind({});
NullAvail.args = {
  startTime: new Date(),
  interview: undefined,
  isAvailable: undefined,
};

export const Confirmed = Template.bind({});
Confirmed.args = {
  startTime: new Date(),
  interview: {
    id: "000",
    inviterId: "a", // Represents inviter
    inviter: {
      id: "a",
      name: "Michael Jackson",
      timeZone: "America/New York",
      email: "xx@gmail.com",
      imageUrl: "",
      codingLanguage: [],
      questionDifficulty: "EASY",
      questionTypes: [],
    },
    inviteeId: "b",
    invitee: {
      id: "b",
      name: "John Smith",
      timeZone: "America/New York",
      email: "yy@gmail.com",
      imageUrl: "",
      codingLanguage: [],
      questionDifficulty: "EASY",
      questionTypes: [],
    },
    startTime: new Date(),
    status: "CONFIRMED",
  },
  user: {
    id: "b",
    name: "John Smith",
    timeZone: "America/New York",
    email: "yy@gmail.com",
    imageUrl: "",
    codingLanguage: [],
    questionDifficulty: "EASY",
    questionTypes: [],
  },
};

export const ReceivedFrom = Template.bind({});
ReceivedFrom.args = {
  startTime: new Date(),
  interview: {
    id: "001",
    inviteeId: "a", // Represents inviter
    invitee: {
      id: "a",
      name: "Michael Jackson",
      timeZone: "America/New York",
      email: "xx@gmail.com",
      imageUrl: "",
      codingLanguage: [],
      questionDifficulty: "EASY",
      questionTypes: [],
    },
    inviterId: "b",
    inviter: {
      id: "b",
      name: "John Smith",
      timeZone: "America/New York",
      email: "yy@gmail.com",
      imageUrl: "",
      codingLanguage: [],
      questionDifficulty: "EASY",
      questionTypes: [],
    },
    startTime: new Date(),
    status: "INVITED",
  },
  user: {
    id: "b",
    name: "John Smith",
    timeZone: "America/New York",
    email: "yy@gmail.com",
    imageUrl: "",
    codingLanguage: [],
    questionDifficulty: "EASY",
    questionTypes: [],
  },
  isAvailable: false,
};

export const Invited = Template.bind({});
Invited.args = {
  startTime: new Date(),
  interview: {
    id: "002",
    inviterId: "a", // Represents inviter
    inviter: {
      id: "a",
      name: "Michael Jackson",
      timeZone: "America/New York",
      email: "xx@gmail.com",
      imageUrl: "",
      codingLanguage: [],
      questionDifficulty: "EASY",
      questionTypes: [],
    },
    inviteeId: "b",
    invitee: {
      id: "b",
      name: "John Smith",
      timeZone: "America/New York",
      email: "yy@gmail.com",
      imageUrl: "",
      codingLanguage: [],
      questionDifficulty: "EASY",
      questionTypes: [],
    },
    startTime: new Date(),
    status: "INVITED",
  },
  user: {
    id: "b",
    name: "John Smith",
    timeZone: "America/New York",
    email: "yy@gmail.com",
    imageUrl: "",
    codingLanguage: [],
    questionDifficulty: "EASY",
    questionTypes: [],
  },
  isAvailable: false,
};

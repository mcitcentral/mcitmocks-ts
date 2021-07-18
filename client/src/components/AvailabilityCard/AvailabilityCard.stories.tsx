import AvailabilityCard, { AvailabilityCardProps } from "./AvailabilityCard";
import { Story } from "@storybook/react";
import { CodingLanguage, QuestionDifficulty, QuestionType } from "@prisma/client";

export default {
  title: "AvailabilityCard",
  component: AvailabilityCard,
  parameters: {
    layout: "centered",
  },
};

const Template: Story<AvailabilityCardProps> = (args) => <AvailabilityCard {...args} />;

export const Current = Template.bind({});
Current.args = {
  availability: {
    id: "availability-id",
    userId: "user-id",
    startTime: new Date(),
    isTaken: false,
    user: {
      name: "John",
      imageUrl: "https://picsum.photos/200",
      questionTypes: [QuestionType.ARRAY],
      questionDifficulty: QuestionDifficulty.EASY,
      codingLanguage: [CodingLanguage.JAVASCRIPT],
    },
  },
};

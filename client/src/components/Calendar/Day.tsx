import React from "react";
import { Interview, User } from "@prisma/client";
import { add } from "date-fns";

import TimeBlock from "./TimeBlock";

interface DayProps {
  date: Date;
  availabilityMap: { [key: string]: boolean };
  interviewMap: { [key: string]: Interview & { inviter: User; invitee: User } };
  toggleAvailability: (startTime: Date) => void;
  user: User;
}

const Day: React.FC<DayProps> = ({ date, availabilityMap, interviewMap, user, toggleAvailability }) => {
  return (
    <div className="calendar-day">
      {Array.from({ length: 24 }, (_, i) => i).map((offset) => {
        const time = add(date, { hours: offset });
        const timeString = time.toISOString();
        const isAvailable = availabilityMap[timeString];
        const interview = interviewMap[timeString];
        return (
          <TimeBlock
            key={timeString}
            startTime={time}
            isAvailable={isAvailable}
            interview={interview}
            user={user}
            toggleAvailability={toggleAvailability}
          />
        );
      })}
    </div>
  );
};

export default Day;

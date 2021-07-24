import { Availability, User } from "@prisma/client";
import { useState, useEffect } from "react";
import { format, lastDayOfISOWeek, startOfISOWeek, sub, add } from "date-fns";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { InterviewWithUserInfo } from "../../../../@types";
import Day from "./Day";
import "./Calendar.scss";

interface CalendarProps {
  interviews: InterviewWithUserInfo[];
  availabilities: Availability[];
  user: User;
  updateAvailabilities: (availabilityMap: { [key: string]: boolean }) => Promise<void>;
  searchAvailabilities: (startTime: string | string[]) => Promise<void>;
}

const mapAvailabilities = (availabilities: Availability[]) => {
  return availabilities.reduce((prev, curr) => {
    const isAvailable = !curr.isTaken;
    prev[curr.startTime.toISOString()] = isAvailable;
    return prev;
  }, {});
};

const Calendar: React.FC<CalendarProps> = ({
  interviews,
  availabilities,
  user,
  searchAvailabilities,
  updateAvailabilities,
}) => {
  const [startDate, setStartDate] = useState<Date>(startOfISOWeek(new Date()));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _availabilityMap = mapAvailabilities(availabilities);
  const [availabilityMap, setAvailabilityMap] = useState<{ [key: string]: boolean }>(_availabilityMap);
  useEffect(() => {
    setIsLoading(false);
    const _availabilityMap = mapAvailabilities(availabilities);
    setAvailabilityMap(_availabilityMap);
  }, [availabilities]);

  const interviewMap = interviews.reduce((prev, curr) => {
    prev[String(curr.startTime)] = curr;
    return prev;
  }, {});

  const header = format(startDate, "MMMM dd - ") + format(lastDayOfISOWeek(startDate), "MMMM dd, yyyy");
  const onClickLeft = () => setStartDate((_startDate) => sub(_startDate, { weeks: 1 }));
  const onClickRight = () => setStartDate((_startDate) => add(_startDate, { weeks: 1 }));

  const toggleAvailability = async (startTime: Date) => {
    const previous = availabilityMap[startTime.toISOString()];
    setAvailabilityMap((prev) => ({ ...prev, [startTime.toISOString()]: !previous }));
  };

  useEffect(() => {
    const startTimes: string[] = [];
    for (const [startTime, isAvailable] of Object.entries(availabilityMap)) {
      if (isAvailable) startTimes.push(startTime);
    }
    searchAvailabilities(startTimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availabilityMap]);

  const handleUpdateAvailabilities = async () => {
    await updateAvailabilities(availabilityMap);
    setIsLoading(true);
  };

  return (
    <div className="calendar">
      <div className="calendar__top">
        <h2>{header}</h2>
        <div className="calendar__navigation">
          <button className="calendar__navigationButton" onClick={onClickLeft}>
            <FaAngleLeft color="#D2D6DC" size={20} />
          </button>
          <button className="calendar__navigationButton" onClick={onClickRight}>
            <FaAngleRight color="#D2D6DC" size={20} />
          </button>
        </div>
      </div>
      <div className="calendar__main">
        <div className="calendar__mainHeader">
          {Array.from({ length: 7 }, (_, i) => i).map((offset) => {
            const date = add(startDate, { days: offset });
            return (
              <div className="calendar-day-label" key={date.toISOString()}>
                <h4>{format(date, "EEEE")}</h4>
                <span>{format(date, "MMMM d")}</span>
              </div>
            );
          })}
        </div>
        <div className="calendar__mainBody">
          {isLoading && <div className="calendar__loading">Loading...</div>}
          {Array.from({ length: 7 }, (_, i) => i).map((offset) => {
            const date = add(startDate, { days: offset });
            return (
              <Day
                key={date.toISOString()}
                date={date}
                availabilityMap={availabilityMap}
                interviewMap={interviewMap}
                toggleAvailability={toggleAvailability}
                user={user}
              />
            );
          })}
        </div>
      </div>
      <div className="calendar__bottom">
        <button className="calendar-save-button" onClick={handleUpdateAvailabilities}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Calendar;

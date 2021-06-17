import React from 'react';
import Day, { dayProps, Interview } from '../Day/Day';
import './Week.css';
export interface weekProps {
    firstDate: Date, 
    dayInfo: dayProps[],
}

const renderDays = (firstDate:Date,dayInfo:dayProps[])=>{
    const days = [];
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();
    const firstDay = firstDate.getDate();
    for(var i = 6; i >= 0; i--) {
        days.push(<Day {...{date: new Date(year,month,firstDay+i),availableTime:dayInfo[i].availableTime,invitedInterviews:dayInfo[i].invitedInterviews,confirmedInterviews:dayInfo[i].confirmedInterviews,receivedInterviews:dayInfo[i].receivedInterviews}}/>);
    }
    return days;
}
const Week: React.FC<weekProps> = ({firstDate,dayInfo})=> {
    const days = renderDays(firstDate,dayInfo);
    return (
        <div className='calendar'>
            {days}
        </div>
    );
};

export default Week;
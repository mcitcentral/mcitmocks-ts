import React, { useState } from "react";
import TimeBlock from "../TimeBlock/TimeBlock";
import { format } from 'date-fns';
import './Day.css';

export interface User {
    id: string,
    email:    string,
    name:     string,
    timeZone: string,
}
export interface Interview {
    id: string,
    inviterId: string, // Represents inviter
    inviter: User,
    inviteeId: string,
    invitee: User // Represents invitee
    startTime: string, // ISO DateTime string in UTC (on the hour)
    status: string,
}
export interface dayProps {
    date: Date, 
    availableTime: Map<number,Date>,// key:startTime, value: Date,
    interviews: Map<number,Interview>,// startTime: Interview,
  }


const renderTimeHelper = (start:number, end:number,date:Date,availableTime:Map<number,Date>,items:any[],interviews:Map<number,Interview>)=> {
    for (var i = start; i < end; i++) {
        const curDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),i);
        items.push(<TimeBlock {...{startTime: curDate,availability: availableTime.get(i),interview: interviews.get(i)}}/>)
    }
};
const renderTime = (date:Date,availableTime:Map<number,Date>,interviews:Map<number,Interview>)=> {
    const items:any = [];
    console.log(format(date,'yyyy/MM/dd/H'));
    renderTimeHelper(8,24,date,availableTime,items,interviews);
    renderTimeHelper(0,8,date,availableTime,items,interviews);
    return items;
};

const Day: React.FC<dayProps> = ({date,availableTime,interviews})=>{
    const items = renderTime(date,availableTime,interviews);
    return (
        <div className="calendar-day" >
            <div className="calendar-day-label">
                <h4>{format(date,'EEEE')}</h4>
                <span>{format(date,'MMMM d')}</span>
            </div>
            <div className="calendar-events" >
                {items}
            </div>
        </div>
        
        
    );

};

export default Day;
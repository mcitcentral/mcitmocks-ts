import React, { useState } from "react";
import TimeBlock from "./TimeBlock";
import { parseISO,format } from 'date-fns';
import './Day.css';

export interface Interview {
    id: string,
    status: string,
    inviterId: string, // Represents inviter
    inviteeId: string, // Represents invitee
    startTime: string; // ISO DateTime string in UTC (on the hour)
    isConfirmed: boolean;
}
export interface dayProps {
    date: Date, 
    availableTime: Map<number,Date>,// key:startTime, value: Date,
    invitedInterviews: Map<number,Interview>,// startTime: Interview,
    receivedInterviews: Map<number,Interview>,
    confirmedInterviews: Map<number,Interview>,
  }


const renderTimeHelper = (start:number, end:number,date:Date,availableTime:Map<number,Date>,items:any[],confirmedInterviews:Map<number,Interview>,invitedInterviews:Map<number,Interview>,receivedInterviews:Map<number,Interview>)=> {
    for (var i = start; i < end; i++) {
        const curDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),i);
        if(availableTime.has(i)){
            items.push(<TimeBlock {...{startTime: curDate,isAvailable: true}}/>)
        } else if(confirmedInterviews.has(i)){
            items.push(<TimeBlock {...{startTime: curDate,isConfirmed: true,withWhom:'John Smith'}}/>)
        } else if(invitedInterviews.has(i)) {
            items.push(<TimeBlock {...{startTime: curDate,asInviter: true,withWhom:'John Smith'}}/>)
        }else if(receivedInterviews.has(i)) {
            items.push(<TimeBlock {...{startTime: curDate,withWhom: 'John Smith'}}/>)
        } else {
            items.push(<TimeBlock {...{startTime: curDate,isAvailable: false}}/>)
        }
        
    }
};
const renderTime = (date:Date,availableTime:Map<number,Date>,confirmedInterviews:Map<number,Interview>,invitedInterviews:Map<number,Interview>,receivedInterviews:Map<number,Interview>)=> {
    const items:any = [];
    console.log(format(date,'yyyy/MM/dd/H'));
    renderTimeHelper(8,24,date,availableTime,items,confirmedInterviews,invitedInterviews,receivedInterviews);
    renderTimeHelper(0,8,date,availableTime,items,confirmedInterviews,invitedInterviews,receivedInterviews);
    return items;
};

const Day: React.FC<dayProps> = ({date,availableTime,confirmedInterviews,invitedInterviews,receivedInterviews})=>{
    const items = renderTime(date,availableTime,confirmedInterviews,invitedInterviews,receivedInterviews);
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
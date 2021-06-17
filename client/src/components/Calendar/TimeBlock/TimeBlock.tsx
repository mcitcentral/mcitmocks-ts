import React, { useState } from "react";
import "./TimeBlock.css";
import { FaRegCalendar, FaRegEnvelope, FaInbox } from "react-icons/fa";
import { useEffect } from "react";
import { parseISO,format } from 'date-fns';

export interface timeProps {
  startTime: Date;
  isAvailable?: boolean | null;
  isConfirmed?: boolean | null;
  withWhom?: string | null;
  asInviter?: boolean | null;
}


const TimeBlock: React.FC<timeProps> = ({ isAvailable, isConfirmed, withWhom, asInviter, startTime}) => {
    const [availability,setAvailability]  = useState(isAvailable);
    const hourStr = format(startTime, 'HH');
    const period = format(startTime, 'aa');
    
    return isAvailable ? (
        <button className="calendar-event-available" onClick={()=>setAvailability(false)} >
            <div className="calendar-available-rectangle"></div>
            <div className="calendar-event-info">
                <div className="calendar-event-time">{hourStr}:00 {period}</div>
                <div className="calendar-event-title">I'm available!</div>
            </div>
        </button>

    )   : isConfirmed ? (
        <button className="calendar-event-confirmed" onClick={()=>{alert('Are you sure you want to cancel the interview?')}}>
            <div className="calendar-confirmed-rectangle"></div>
            <div className="calendar-event-info">
                <div className="calendar-event-time">{hourStr}:00 {period}</div>
                <div className="calendar-event-icon"><FaRegCalendar /></div>
                <div className="calendar-event-title">{withWhom}</div>
            </div>
        </button>
    )   : asInviter? (
        <button className="calendar-event-request" onClick={()=>{}}>
            <div className="calendar-request-rectangle"></div>
            <div className="calendar-event-info">
                <div className="calendar-event-time">{hourStr}:00 {period}</div>
                <div className="calendar-event-icon"><FaRegEnvelope /></div>
                <div className="calendar-event-title">{withWhom}</div>
            </div>
        </button>
    )   : isAvailable == null? (
        <button className="calendar-event-request" onClick={()=>{}}>
            <div className="calendar-request-rectangle"></div>
            <div className="calendar-event-info">
                <div className="calendar-event-time">{hourStr}:00 {period}</div>
                <div className="calendar-event-icon"><FaInbox /></div>
                <div className="calendar-event-title">{withWhom}</div>
            </div>
        </button>
    )   : (
        <button className="calendar-event-navailable" onClick={()=>setAvailability(true)}>
            <div className="calendar-navailable-rectangle"></div>
            <div className="calendar-event-info">
                <div className="calendar-event-time">{hourStr}:00 {period}</div>
            </div>
        </button>
    )
};

export default TimeBlock;



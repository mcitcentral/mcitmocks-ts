import { format,lastDayOfWeek } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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
        days.push(<Day {...{date: new Date(year,month,firstDay+i),availableTime:dayInfo[i].availableTime,interviews:dayInfo[i].interviews}}/>);
    }
    return days;
}
const Week: React.FC<weekProps> = ({firstDate,dayInfo})=> {
    const [curFirstDate, setCurFirstDate] = useState(firstDate);
    const days = renderDays(curFirstDate,dayInfo);
    const lastDate = format(lastDayOfWeek(curFirstDate), 'MMMM dd');
    const header = format(curFirstDate, 'MMMM dd - ')+lastDate+format(curFirstDate,', yyyy');


    const onClickLeft = ()=> {
        setCurFirstDate(new Date(curFirstDate.getFullYear(),curFirstDate.getMonth(),curFirstDate.getDate()-7));
    }
    const onClickRight = ()=> {
        setCurFirstDate(new Date(curFirstDate.getFullYear(),curFirstDate.getMonth(),curFirstDate.getDate()+7));
    }
    
    
    






    return (
        
        <div className="container">
            
            <div>
                <h2>{header}</h2>
                <div className="button-group">
                    <button className="button" onClick={onClickLeft}><FaAngleLeft style={{ color: "#D2D6DC", width: "20px",height: "20px"}}/></button>
                    <button className="button" onClick={onClickRight}><FaAngleRight style={{color: "#D2D6DC" , width: "20px",height: "20px"}}/></button>
                </div>
            </div>
            
            <hr style={{border: "1px solid #E5E7EB", width:"1125px", float: "left"}}/>
            <div className='calendar'>
            {days}
            </div>

            <button className="normalButton">SAVE</button>
        </div>
        
    );
};

export default Week;
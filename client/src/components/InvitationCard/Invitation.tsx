import { Interview } from "@prisma/client";
import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import {MdCheck, MdClose} from "react-icons/md";
import apiClient from "../../lib/apiClient";
import "./Invitation.css";

export interface invitationProps {
    interview: Interview,
}
 

const Invitation: React.FC<invitationProps> = ({interview}) => {
    //TODO: change id to user name
    const name = interview.inviterId;
    const date = format(interview.startTime, "MMMM d")+' at '+format(interview.startTime,"h:00a");
    return (
        <div className="box">
            <div className="name">{name}</div>
            <div className="time">{date}</div>
            <div className="iconGroup">
                <button className="button"><MdClose className="timesIcon"/></button>
                <button className="button"><MdCheck className="checkIcon"/></button>
            </div>
        </div>
    );   
};

export default Invitation;



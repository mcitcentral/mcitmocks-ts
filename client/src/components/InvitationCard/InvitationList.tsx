import { Interview } from '@prisma/client';
import React from 'react';
import Invitation from './Invitation';
import "./InvitationList.css";
interface invitationListProps {
    invitations: Interview[],
}
const InvitationList: React.FC<invitationListProps> = ({invitations})=>{
    
    return (
        <div className="container">
            <div style={{fontFamily: "IBM Plex Mono", fontStyle: "normal",fontSize: "12px",lineHeight: "16px",}}>INVITATIONS</div>
            <div>
                {invitations.map(function(item, i){
                    console.log(item);
                    return <Invitation {...{interview:item}}/>;
                })}
            </div>
        </div>
    );
};

export default InvitationList;
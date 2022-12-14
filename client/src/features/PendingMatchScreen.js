import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import NavigationMenu from './NavigationMenu';
import PendingMatchRow from './PendingMatchRow';

function PendingMatchScreen({ userInfo, match, setMatch, cellStyle }) {
   
    const matches = useSelector((state)=>state.matches.matches);
    const [confirmedMatch, setConfirmedMatch] = useState(false);
    const [deletedMatchMessage, setDeletedMatchMessage] = useState();
  
    let pendingMatches = [];
    
    if(matches.length > 0 && pendingMatches.length === 0) {
        pendingMatches = matches.filter((match)=>match.sender_contact_id === userInfo.contact.id && match.recipient_contact_id && !match.match_confirmed);
    }

    if(!confirmedMatch) {
        return (
            <div>
                <NavigationMenu />
                <br />
                {deletedMatchMessage ? <p>{deletedMatchMessage}<br /></p> : null}
                <h1>Pending Matches</h1>
                <table>
                    <thead>
                        <tr>
                            <th style = {cellStyle}>First Name</th>
                            <th style = {cellStyle}>Last Name</th>
                            <th style = {cellStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingMatches.length > 0 ? pendingMatches.map((match)=> <PendingMatchRow key = {match.id} cellStyle = {cellStyle} matchInfo = {match} setConfirmedMatch = {setConfirmedMatch} setMatch = {setMatch} setDeletedMatchMessage = {setDeletedMatchMessage} />) : (
                            <tr>
                                <td style = {cellStyle} colSpan = "3">No pending matches</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            );
        } 
    else {
        return (
            <div>
                <NavigationMenu />
                <br />
                <h1>Congratulations!</h1>
                <p>
                    Your match with <strong>{match.recipient_contact.first_name} {match.recipient_contact.last_name} </strong>has been confirmed.
                    <br />
                    Click <Link to = "/viewMatch">here</Link> to see details.
                </p>
            </div>
            );
        }
}

export default PendingMatchScreen;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import NavigationMenu from './NavigationMenu';

function PendingMatchScreen({ userInfo, cellStyle }) {
   
    const matches = useSelector((state)=>state.matches.matches);
   
    let pendingMatches = [];
    
    if(matches.length > 0 && pendingMatches.length === 0) {
        pendingMatches = matches.filter((match)=>match.sender_contact_id === userInfo.contact.id && match.recipient_contact_id);
    }

    return (
        <div>
            <NavigationMenu />
            <br />
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
                    {pendingMatches.length > 0 ? pendingMatches.map((match)=> (
                        <tr key = {match.id}>
                            <td style = {cellStyle}>{match.recipient_contact.first_name}</td>
                            <td style = {cellStyle}>{match.recipient_contact.last_name}</td>
                            <td style = {cellStyle}><button>Confirm</button> <button>Delete</button></td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    );
}

export default PendingMatchScreen;

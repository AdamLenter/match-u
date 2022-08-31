import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function MyMatchRow({ cellStyle, matchInfo, setMatch, userInfo}) {
   
    let nameToDisplay = {};

    if(matchInfo.sender_contact.id === userInfo.contact.id) {
        nameToDisplay = matchInfo.recipient_contact;
    }
    else {
        nameToDisplay = matchInfo.sender_contact;
    }

    function handleViewMatchClick(){
        setMatch(matchInfo);
    }

    return (
        <tr key = {matchInfo.id}>
            <td style = {cellStyle}>{nameToDisplay.first_name}</td>
            <td style = {cellStyle}>{nameToDisplay.last_name}</td>
            <td style = {cellStyle}>
                <Link to = "/viewMatch" onClick = {handleViewMatchClick}>View Match</Link>
            </td>
        </tr>
    );
}

export default MyMatchRow;

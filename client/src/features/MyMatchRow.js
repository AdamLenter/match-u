import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import { updateMatch, deleteMatch } from './matches/matchesSlice';
import NavigationMenu from './NavigationMenu';


function MyMatchRow({ cellStyle, matchInfo, userInfo}) {
   
    let nameToDisplay = {};

    if(matchInfo.sender_contact.id === userInfo.contact.id) {
        nameToDisplay = matchInfo.recipient_contact;
    }
    else {
        nameToDisplay = matchInfo.sender_contact;
    }

    function viewMatch() {
        console.log(nameToDisplay);
    }
    return (
        <tr key = {matchInfo.id}>
            <td style = {cellStyle}>{nameToDisplay.first_name}</td>
            <td style = {cellStyle}>{nameToDisplay.last_name}</td>
            <td style = {cellStyle}><button name = "viewMatch" onClick = {viewMatch}>VIEW</button></td>
        </tr>
    );
}

export default MyMatchRow;

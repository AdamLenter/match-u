import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import { updateMatch } from './matches/matchesSlice';
import NavigationMenu from './NavigationMenu';


function PendingMatchRow({ cellStyle, matchInfo, setConfirmedMatch }) {
   
    const dispatch = useDispatch();

    function confirmMatch() {
        fetch(`/matches/${matchInfo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify({match_confirmed: true})
            })
            .then(() => {
                let updatedMatch = {...matchInfo};
                updatedMatch.match_confirmed = true;
                dispatch(updateMatch(updatedMatch));
                setConfirmedMatch(matchInfo);
                })
    }

    return (
        <tr key = {matchInfo.id}>
            <td style = {cellStyle}>{matchInfo.recipient_contact.first_name}</td>
            <td style = {cellStyle}>{matchInfo.recipient_contact.last_name}</td>
            <td style = {cellStyle}><button name = "confirmMatch" value = {matchInfo.id} onClick = {confirmMatch}>Confirm</button> <button>Delete</button></td>
        </tr>
    );
}

export default PendingMatchRow;

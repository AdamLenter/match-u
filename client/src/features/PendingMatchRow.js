import React from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import { updateMatch, deleteMatch } from './matches/matchesSlice';


function PendingMatchRow({ cellStyle, matchInfo, setConfirmedMatch, setMatch, setDeletedMatchMessage}) {
   
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
                setConfirmedMatch(true);
                setMatch(matchInfo);
                })
    }

    function processDeleteMatch() {
        fetch(`/matches/${matchInfo.id}`, {
            method: "DELETE"})
            .then (()=> {
                dispatch(deleteMatch(matchInfo.id));
                setDeletedMatchMessage("Match successfully deleted.");
            })
        return;
    }

    return (
        <tr key = {matchInfo.id}>
            <td style = {cellStyle}>{matchInfo.recipient_contact.first_name}</td>
            <td style = {cellStyle}>{matchInfo.recipient_contact.last_name}</td>
            <td style = {cellStyle}><button name = "confirmMatch" onClick = {confirmMatch}>Confirm</button> <button onClick = {processDeleteMatch}>Delete</button></td>
        </tr>
    );
}

export default PendingMatchRow;

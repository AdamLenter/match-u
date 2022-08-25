import React, { useState } from 'react';
import '../App.css';
import ErrorMessageDiv from './ErrorMessageDiv';
import NavigationMenu from './NavigationMenu';

function ReceiveMatchForm({ userInfo, setMatchSuccessful }) {
   
    const [enteredMatchCode, setEnteredMatchCode] = useState("");
    const [errorMessage, setErrorMessage]  = useState("");

    function updateEnteredMatchCode(event) {
        const updatedMatchCode = event.target.value.toUpperCase();
        setEnteredMatchCode(updatedMatchCode);
    } 

    function findMatch(event) {
        event.preventDefault();

        fetch(`/match_code/${enteredMatchCode}`)
        .then((r)=> {
            if(r.ok) {
                    r.json()
                .then((returnedMatch) => {
                    if(returnedMatch.sender_contact_id === userInfo.contact.id) {
                        //Sender and recipient are the same person.
                        setErrorMessage("Invalid code. Please try again.");
                        setEnteredMatchCode("");
                    }
                    else if(returnedMatch.recipient_contact_id) {
                        //There is a recipient contact id. therefore, the code has been claimed.
                        setErrorMessage("The code has expired. Please try again.");
                        setEnteredMatchCode("");
                    }
                    else {
                        //The code is valid:
                        fetch(`/matches/${returnedMatch.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                                },
                            body: JSON.stringify({recipient_contact_id: userInfo.contact.id})
                            })
                            .then((r)=r.json())
                            .then(()=>setMatchSuccessful(true));
                        }
                    }
                )}
            else {
                setErrorMessage("Invalid code. Please try again.");
                setEnteredMatchCode("");
            }
            })
        }

    return (
        <div>
            <br />
            {errorMessage ? <ErrorMessageDiv errorMessage = {errorMessage} />: null}
            <h1>Enter Match Code</h1>
            <form onSubmit = {findMatch}>
                <input name = "matchCode" value = {enteredMatchCode} onChange = {updateEnteredMatchCode} />
                <br />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default ReceiveMatchForm;

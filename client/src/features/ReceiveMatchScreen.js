import React, { useState } from 'react';
import '../App.css';
import ErrorMessageDiv from './ErrorMessageDiv';
import NavigationMenu from './NavigationMenu';
import ReceiveMatchForm from './ReceiveMatchForm';

function ReceiveMatchScreen({ userInfo }) {
   
    const [matchSuccessful, setMatchSuccessful] = useState(false);

    function MatchSuccessfulMessage() {
        return (
            <div>
                <h1>Match Code Successful</h1>
                <p>
                    <strong>
                        Once the sender confirms the match, you will be able to see details.
                    </strong>
                </p>
            </div>
        )
    }
    return (
        <div>
            <NavigationMenu />
            <br />
            {!matchSuccessful ? <ReceiveMatchForm userInfo = {userInfo} setMatchSuccessful = {setMatchSuccessful} /> : <MatchSuccessfulMessage />}
        </div>
    );
}

export default ReceiveMatchScreen;

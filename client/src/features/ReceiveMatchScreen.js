import React, { useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';
import RatingRow from './RatingRow';

function ReceiveMatchScreen({ userInfo }) {
   
    const [enteredMatchCode, setEnteredMatchCode] = useState("");

    function updateEnteredMatchCode(event) {
        const updatedMatchCode = event.target.value.toUpperCase();
        setEnteredMatchCode(updatedMatchCode);
    } 

    function findMatch(event) {
        event.preventDefault();
        console.log(enteredMatchCode);
    }
    return (
        <div>
            <NavigationMenu />
            <br />
            <h1>Enter Match Code</h1>
            <form onSubmit = {findMatch}>
                <input name = "matchCode" value = {enteredMatchCode} onChange = {updateEnteredMatchCode} />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default ReceiveMatchScreen;

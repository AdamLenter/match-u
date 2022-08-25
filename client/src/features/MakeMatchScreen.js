import React, { useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';
import RatingRow from './RatingRow';

function MakeMatchScreen({ userInfo }) {
    const [matchCode, setMatchCode] = useState("");
    const [buttonTerm, setButtonTerm] = useState();

    const buttonPhrases = [
        "Hook me up!", 
        "Let's do this!", 
        "Show it to me!", 
        "I wanna know!", 
        "Booya!", 
        "Let's Go!"
    ]

    function generateString() {
        let result = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    if(!buttonTerm && buttonPhrases.length > 0) {
        setButtonTerm(Math.floor(Math.random()*buttonPhrases.length));
    }

    function generateMatchCode() {
        const matchInfo = {
            sender_contact_id: userInfo.contact.id, 
            match_code: generateString(), 
            match_confirmed: false
        }
        
        fetch("/matches", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(matchInfo)
            })
        .then((response) => {
            if (response.ok) {
                (response.json())
                .then((matchInfo)=> {
                    if(matchInfo.id) {
                        setMatchCode(matchInfo.match_code);
                    }
                    else {
                        generateMatchCode();
                    }
                })
                
            }
        else {
            // generateMatchCode();
            console.log("Bad");
        }
        })
    }
    
    function DisplayButton() {
        return (
            <div>
                <h1>Make a Match</h1>
                <br />
                <button onClick = {generateMatchCode}>{buttonPhrases[buttonTerm]}</button>
            </div>
        )
    }
    function DisplayMatchCode() {
        return (
            <div>
                <h1>Match Code:</h1>
                <br />
                <h2>{matchCode}</h2>
            </div>
        )
    }

    return (
        <div>
            <NavigationMenu />
           {!matchCode ? <DisplayButton /> : <DisplayMatchCode />}
        </div>
    );
}

export default MakeMatchScreen;

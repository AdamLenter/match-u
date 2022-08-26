import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import NavigationMenu from './NavigationMenu';
import { addMatch } from './matches/matchesSlice';

function MakeMatchScreen({ userInfo }) {
    const [matchCode, setMatchCode] = useState("");
    const [buttonTerm, setButtonTerm] = useState();
   
    const matches = useSelector((state)=>state.matches.matches);
    const dispatch = useDispatch();

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
        const matchInfoForDb = {
            sender_contact_id: userInfo.contact.id, 
            match_code: generateString(), 
            match_confirmed: false
        }
        
        fetch("/matches", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(matchInfoForDb)
            })
        .then((response) => {
            if (response.ok) {
                (response.json())
                .then((matchInfo)=> {
                    if(matchInfo.id) {
                        setMatchCode(matchInfo.match_code);
                        dispatch(addMatch(matchInfo));
                    }
                    else {
                        console.log("Here");
                    }
                })
                
            }
        else {
            generateMatchCode();
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

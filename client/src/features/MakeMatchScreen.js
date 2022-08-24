import React, { useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';
import RatingRow from './RatingRow';

function MakeMatchScreen({ userInfo }) {
  
    const buttonPhrases = [
        "Hook me up!", 
        "Let's do this!", 
        "Show it to me!", 
        "I wanna know!", 
        "Booya!", 
        "Let's Go!"
    ]

    const buttonTerm = Math.floor(Math.random()*buttonPhrases.length);
       
    function generateMatchCode() {
        console.log("Generate code");
    }
    
    return (
        <div>
            <NavigationMenu />
            <h1>Make a Match</h1>
            <button onClick = {generateMatchCode}>{buttonPhrases[buttonTerm]}</button>
        </div>
    );
}

export default MakeMatchScreen;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import MyMatchRow from './MyMatchRow';
import NavigationMenu from './NavigationMenu';

function MyMatchesScreen({ userInfo, setMatch, cellStyle }) {
   
    const matches = useSelector((state)=>state.matches.matches);
    
    let myMatches = [];
    
    if(matches.length > 0 && myMatches.length === 0) {
        myMatches = matches.filter((match)=>match.match_confirmed);
    }

    return (
        <div>
            <NavigationMenu />
            <br />
            <h1>My Matches</h1>
            <table>
                <thead>
                    <tr>
                        <th style = {cellStyle}>First Name</th>
                        <th style = {cellStyle}>Last Name</th>
                        <th style = {cellStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myMatches.length > 0 ? myMatches.map((match)=> <MyMatchRow key = {match.id} cellStyle = {cellStyle} matchInfo = {match} setMatch = {setMatch} userInfo = {userInfo} />) : (
                        <tr>
                            <td style = {cellStyle} colSpan = "3">No matches to display</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        );
}

export default MyMatchesScreen;

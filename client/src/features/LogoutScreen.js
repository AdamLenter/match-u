import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearMatches } from './matches/matchesSlice';


function LogoutScreen({ setMatch, setUserInfo }) {

    const dispatch = useDispatch();


    useEffect(()=> {
        fetch("/logout", {
            method: "DELETE"})
            .then(()=> {
                setUserInfo({});
                setMatch({});
                dispatch(clearMatches());
                })}, [])
return (
    <div>
        <h1>Match U</h1>
        <p>You have successfully logged out.</p>
        <br />
        <p>Click <Link to = "/">here</Link> to login</p>
    </div>  
);
}

export default LogoutScreen;

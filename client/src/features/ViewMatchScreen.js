import React, { useEffect, useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';

function ViewMatchScreen({ userInfo, match, cellStyle }) {

    const [matchRatings, setMatchRatings] = useState([]);
    const [matchLoaded, setMatchLoaded] = useState(false);

    let matchContactId
    let matchFirstName = "";
    let matchLastName = "";
    let mySortedRatings = [];
    let sortedMatchRatings = [];
    
    if(match && match.sender_contact) {
        if(match.sender_contact.id === userInfo.contact.id) {
            matchContactId = match.recipient_contact.id;
            matchFirstName = match.recipient_contact.first_name;
            matchLastName = match.recipient_contact.last_name;
        }
        else {
            matchContactId = match.sender_contact.id;
            matchFirstName = match.sender_contact.first_name;
            matchLastName = match.sender_contact.last_name;
        }
    }
    
    if(matchContactId > 0 && !matchLoaded) {
        fetch(`/show_contact/${matchContactId}`)
        .then((r)=>r.json())
        .then((matchInfo) => setMatchRatings(matchInfo))
        .then(() => setMatchLoaded(true))
    }

    let mutualMatches = 0;
    let currentCount = 0;
    let totalDifference = 0;
    let totalAbsoluteValueDifference = 0;
    let biggestDifference = 0;
    let smallestDifference = 9;

    let differenceMatches = {}

    for(let x = 0; x < 10; x++) {
        differenceMatches[x] = [];
    }
    
    if(userInfo.contact && userInfo.contact.contact_ratings && userInfo.contact.contact_ratings.length > 0 && matchRatings.length > 0) {
        //The user has ratings:
       
        mySortedRatings = userInfo.contact.contact_ratings.sort((a, b)=> {
            if(a.item.id < b.item.id) {
                return -1;
            }
            else {
                return 1;
            }
        })
        sortedMatchRatings = matchRatings.sort((a, b)=> {
            if(a.item.id < b.item.id) {
                return -1;
            }
            else {
                return 1;
            }
        })
        
        for(let i = 0; i < mySortedRatings.length; i++) {
            while(sortedMatchRatings[currentCount].item.id < mySortedRatings[i].item.id && currentCount < sortedMatchRatings.length) {
                currentCount += 1; 
            }

            if(sortedMatchRatings[currentCount].item.id === mySortedRatings[i].item.id) {
                mutualMatches += 1;

                const difference = Number(mySortedRatings[i].rating) - Number(sortedMatchRatings[currentCount].rating);
                totalDifference += difference;
                
                const absoluteValueOfDifference = Math.abs(difference);
                totalAbsoluteValueDifference += absoluteValueOfDifference;

                biggestDifference = Math.max(biggestDifference, absoluteValueOfDifference);
                smallestDifference = Math.min(smallestDifference, absoluteValueOfDifference);

                differenceMatches[absoluteValueOfDifference].push({
                    myRating: mySortedRatings[i], 
                    matchRating: sortedMatchRatings[currentCount]
                    })
            }
        }
    }
   
    if(matchContactId && mutualMatches > 0) {
        return (
            <div>
                <NavigationMenu />
                <h1>View Match</h1>
                <h2>{matchFirstName} {matchLastName}</h2>
                <br />
                <br />
                <h2>Statistics</h2>
                <table>
                    <tbody>
                        <tr>
                            <td style = {cellStyle}><strong>Number of mutual matches</strong></td>
                            <td style = {cellStyle}>{mutualMatches}</td>
                        </tr>
                        <tr>
                            <td style = {cellStyle}><strong>Your Ratings Average</strong></td>
                            <td style = {cellStyle}>
                            {totalDifference === 0 ? 
                                "A Perfect Match" : 
                                (
                                <span>
                                    {Math.round(Math.abs(totalDifference) * 100) / 100}
                                    {totalDifference > 0 ? " greater than " : " less than "}
                                    {matchFirstName}'s
                                </span>
                                )
                            }
                            </td>
                        </tr>
                        
                        <tr>
                            <td style = {cellStyle}><strong>Average Rating Difference</strong></td>
                            <td style = {cellStyle}>
                            {totalAbsoluteValueDifference === 0 ? 
                                "A Perfect Match" : 
                                (
                                <span>
                                    {Math.round(totalAbsoluteValueDifference * 100) / 100}
                                </span>
                                )
                            }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />

                <h2>Perfect Matches</h2>
                <table>
                    <thead>
                        <tr>
                            <th style = {cellStyle}>Item</th>
                            <th style = {cellStyle}>Category</th>
                            <th style = {cellStyle}>Rating</th>
                        </tr>
                    </thead>

                    <tbody>
                        {differenceMatches[0].length > 0 ? differenceMatches[0].map((match) => (
                            <tr key = {match.myRating.item.id}>
                                <td style = {cellStyle}>{match.myRating.item.name}</td>
                                <td style = {cellStyle}>{match.myRating.item.category.name}</td>
                                <td style = {cellStyle}>{match.myRating.rating}</td>
                            </tr>
                        )
                        ) :
                    (
                        <tr>
                            <td style = {cellStyle} colSpan = "3">No perfect matches</td>
                        </tr>
                    )
                    }
                    </tbody>
                </table>
                <br />
                <br />

                <h2>Biggest Differences</h2>
                <table>
                    <thead>
                        <tr>
                            <th style = {cellStyle}>Item</th>
                            <th style = {cellStyle}>Category</th>
                            <th style = {cellStyle}>Your Rating</th>
                            <th style = {cellStyle}>{matchFirstName}'s Rating</th>
                            <th style = {cellStyle}>Difference</th>
                        </tr>
                    </thead>

                    <tbody>
                        {differenceMatches[biggestDifference].map((match) => (
                            <tr key = {match.myRating.item.id}>
                                <td style = {cellStyle}>{match.myRating.item.name}</td>
                                <td style = {cellStyle}>{match.myRating.item.category.name}</td>
                                <td style = {cellStyle}>{match.myRating.rating}</td>
                                <td style = {cellStyle}>{match.matchRating.rating}</td>
                                <td style = {cellStyle}>{match.myRating.rating - match.matchRating.rating}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
                <br />
                <br />

                <h2>Smallest Differences</h2>
                <table>
                    <thead>
                        <tr>
                            <th style = {cellStyle}>Item</th>
                            <th style = {cellStyle}>Category</th>
                            <th style = {cellStyle}>Your Rating</th>
                            <th style = {cellStyle}>{matchFirstName}'s Rating</th>
                            <th style = {cellStyle}>Difference</th>
                        </tr>
                    </thead>

                    <tbody>
                        {differenceMatches[smallestDifference].map((match) => (
                            <tr key = {match.myRating.item.id}>
                                <td style = {cellStyle}>{match.myRating.item.name}</td>
                                <td style = {cellStyle}>{match.myRating.item.category.name}</td>
                                <td style = {cellStyle}>{match.myRating.rating}</td>
                                <td style = {cellStyle}>{match.matchRating.rating}</td>
                                <td style = {cellStyle}>{match.myRating.rating - match.matchRating.rating}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
                <br />
                <br />
            </div>
        );
    }
    else if(!matchContactId) {
        return (
            <div>
                <NavigationMenu />
                <br />
                <h1>Select a Match</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <NavigationMenu />
                <br />
                <h1>View Match</h1>
                <h2>{matchFirstName} {matchLastName}</h2>
                <p>(no mutual matches)</p>
            </div>
        )
    }
}

export default ViewMatchScreen;

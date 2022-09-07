import React, { useEffect, useState } from 'react';
import '../App.css';
import IndividualRatingsTable from './IndividualRatingsTable';
import MatchComparisonTable from './MatchComparisonTable';
import MatchStatisticsTable from './MatchStatisticsTable';
import NavigationMenu from './NavigationMenu';
import PerfectMatchesTable from './PerfectMatchesTable';
import { useDispatch } from 'react-redux';
import { deleteMatch } from './matches/matchesSlice';


import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

function ViewMatchScreen({ userInfo, match, setMatch, cellStyle }) {
    
    const dispatch = useDispatch();
    
    const [matchRatings, setMatchRatings] = useState([]);
    const [matchLoaded, setMatchLoaded] = useState(false);
    const [deleteButtonMessage, setDeleteButtonMessage] = useState("Delete Match");
    const [matchDeleted, setMatchDeleted] = useState(false);

    const [matchInfoToDisplay, setMatchInfoToDisplay] = useState({
        statistics: true, 
        smallestDifference: true, 
        biggestDifference: true,  
        highestCombined: true, 
        lowestCombined: true, 
        allMutualRatings: true,
        allMatchRatings: true
    })

    function handleDisplaySwitch(event) {
        let updatedDataToDisplay = {...matchInfoToDisplay};
        updatedDataToDisplay[event.target.name] = !updatedDataToDisplay[event.target.name];
        setMatchInfoToDisplay(updatedDataToDisplay);
    }

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

    let mutualMatches = [];
    let matchCount = 0;
    let totalDifference = 0;
    let totalAbsoluteValueDifference = 0;
    let biggestDifference = 0;
    let smallestDifference = 9;
    let highestCombinedRating = 0;
    let lowestCombinedRating = 20;
    
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
    
        
        for(let myCount = 0; myCount < mySortedRatings.length; myCount++) { 
            while(mySortedRatings[myCount] && sortedMatchRatings[matchCount] && sortedMatchRatings[matchCount].item && mySortedRatings[myCount].item && sortedMatchRatings[matchCount].item.id < mySortedRatings[myCount].item.id && matchCount < sortedMatchRatings.length) {
                matchCount += 1; 
            }

            if(mySortedRatings[myCount] && sortedMatchRatings[matchCount] && sortedMatchRatings[matchCount].item.id === mySortedRatings[myCount].item.id) {
                const difference = Number(mySortedRatings[myCount].rating) - Number(sortedMatchRatings[matchCount].rating);
                totalDifference += difference;
                
                const absoluteValueOfDifference = Math.abs(difference);
                totalAbsoluteValueDifference += absoluteValueOfDifference;

                const combinedRating = mySortedRatings[myCount].rating + sortedMatchRatings[matchCount].rating;

                biggestDifference = Math.max(biggestDifference, absoluteValueOfDifference);
                smallestDifference = Math.min(smallestDifference, absoluteValueOfDifference);

                highestCombinedRating = Math.max(highestCombinedRating, combinedRating);
                lowestCombinedRating = Math.min(lowestCombinedRating, combinedRating);

                mutualMatches.push({
                    myRating: mySortedRatings[myCount], 
                    matchRating: sortedMatchRatings[matchCount]
                    })
            }
        }
    }
   
    function handleDeleteMatchButton(){
        if(deleteButtonMessage === "Delete Match") {
            setDeleteButtonMessage("Click if you're 1,000% sure you want to do this.")
        }
        else {
            fetch(`/matches/${match.id}`, {
                method: "DELETE"})
                .then (()=> {
                    dispatch(deleteMatch(match.id));
                    setMatch();
                    setMatchDeleted(true);
                })
            }
        return;
    }
    
    if(matchContactId && mutualMatches.length > 0) {
        return (
            <div>
                <NavigationMenu />
                <br />
                <h1>{matchFirstName} {matchLastName}</h1>
                <br />
                
                <div className = "formGroup">
                    <h3>Display Data:</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td style = {cellStyle}>
                                    Statistics:
                                    <br />
                                    <Switch name = "statistics" checked = {matchInfoToDisplay.statistics} onChange = {handleDisplaySwitch}/>
                                </td>
                           
                                <td style = {cellStyle}>Perfect Matches/<br />Smallest Differences: 
                                    <br />
                                    <Switch name = "smallestDifference" checked = {matchInfoToDisplay.smallestDifference} onChange = {handleDisplaySwitch}/>
                                </td>
                           
                                <td style = {cellStyle}>
                                    Biggest Differences:
                                    <br />
                                    <Switch name = "biggestDifference" checked = {matchInfoToDisplay.biggestDifference} onChange = {handleDisplaySwitch}/>
                                </td>
                            
                                <td style = {cellStyle}>
                                    Highest Combined: 
                                    <br />
                                    <Switch name = "highestCombined" checked = {matchInfoToDisplay.highestCombined} onChange = {handleDisplaySwitch}/>
                                </td>
            
                                <td style = {cellStyle}>
                                    Lowest Combined:
                                    <br />
                                    <Switch name = "lowestCombined" checked = {matchInfoToDisplay.lowestCombined} onChange = {handleDisplaySwitch}/>
                                </td>
                  
                                <td style = {cellStyle}>
                                    All Common Ratings:
                                    <br />
                                    <Switch name = "allMutualRatings" checked = {matchInfoToDisplay.allMutualRatings} onChange = {handleDisplaySwitch}/>
                                </td>
        
                                <td style = {cellStyle}>
                                    All of {matchFirstName}'s Ratings:
                                    <br />
                                    <Switch name = "allMatchRatings" checked = {matchInfoToDisplay.allMatchRatings} onChange = {handleDisplaySwitch}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                </div>

                {matchInfoToDisplay.statistics ? 
                    <MatchStatisticsTable matchFirstName = {matchFirstName} numberOfMutualMatches = {mutualMatches.length} totalDifference = {totalDifference} totalAbsoluteValueDifference = {totalAbsoluteValueDifference} cellStyle = {cellStyle} />
                    : 
                    null
                }
                
                
                {matchInfoToDisplay.smallestDifference ? (
                    <div>
                        <PerfectMatchesTable perfectMatches = {mutualMatches.filter((match)=>match.myRating.rating === match.matchRating.rating)} cellStyle = {cellStyle} />

                        {smallestDifference > 0 ? ( 
                            <div>
                                <h2>Smallest Difference</h2>
                                <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating - match.matchRating.rating) === smallestDifference)} cellStyle = {cellStyle} differenceFieldPresent = {true} combinedFieldPresent = {false} />
                            </div>
                        ) : null
                        }
                    </div>) : null}
                
                {matchInfoToDisplay.biggestDifference ? 
                    (
                    <div>
                        <h2>Biggest Differences</h2>
                        <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating - match.matchRating.rating) === biggestDifference)} cellStyle = {cellStyle} differenceFieldPresent = {true} combinedFieldPresent = {false} />
                    </div>
                    ) : null}

                {matchInfoToDisplay.highestCombined ? (
                    <div>
                        <h2>Highest Combined Rating</h2>
                        <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating + match.matchRating.rating) === highestCombinedRating)} cellStyle = {cellStyle} differenceFieldPresent = {false} combinedFieldPresent = {true} />
                    </div>
                    ) : null}

                {matchInfoToDisplay.lowestCombined ? (
                    <div>
                        <h2>Lowest Combined Rating</h2>
                        <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating + match.matchRating.rating) === lowestCombinedRating)} cellStyle = {cellStyle} differenceFieldPresent = {false} combinedFieldPresent = {true} />
                    </div>
                )    : null}

                {matchInfoToDisplay.allMutualRatings ? (
                    <div>
                        <h2>All Common Ratings</h2>
                        <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches} cellStyle = {cellStyle} differenceFieldPresent = {true} combinedFieldPresent = {true} />
                    </div>) : null}

                {matchInfoToDisplay.allMatchRatings ? (
                    <div>
                        <h2>All of {matchFirstName}'s Ratings</h2>
                        <IndividualRatingsTable ratings = {matchRatings} ratingCanBeEdited = {false} cellStyle = {cellStyle} />
                    </div>) : null}

                <Link to = "/myMatches">Return to My Matches</Link>
                <br />
                <br />
                <button onClick = {handleDeleteMatchButton}>{deleteButtonMessage}</button>
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
                {matchDeleted ? <p className = "successMessage">Match successfully deleted</p> : null}
                <h1>No match selected</h1>
                <Link to = "/myMatches">Return to My Matches</Link>
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
                <p>(no shared matches)</p>
                <br />

                <h2>All of {matchFirstName}'s Ratings</h2>
                <IndividualRatingsTable ratings = {matchRatings} cellStyle = {cellStyle} />
                <Link to = "/myMatches">Return to My Matches</Link>
                <br />
                <br />
                <br />
                <button onClick = {handleDeleteMatchButton}>{deleteButtonMessage}</button>
                <br />
                <br />
            </div>
        )
    }
}

export default ViewMatchScreen;

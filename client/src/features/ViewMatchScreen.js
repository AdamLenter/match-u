import React, { useEffect, useState } from 'react';
import '../App.css';
import IndividualRatingsTable from './IndividualRatingsTable';
import MatchComparisonTable from './MatchComparisonTable';
import MatchStatisticsTable from './MatchStatisticsTable';
import NavigationMenu from './NavigationMenu';
import PerfectMatchesTable from './PerfectMatchesTable';

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

    let mutualMatches = [];
    let currentCount = 0;
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
        
        for(let i = 0; i < mySortedRatings.length; i++) {
            while(sortedMatchRatings[currentCount].item.id < mySortedRatings[i].item.id && currentCount < sortedMatchRatings.length) {
                currentCount += 1; 
            }

            if(sortedMatchRatings[currentCount].item.id === mySortedRatings[i].item.id) {
                const difference = Number(mySortedRatings[i].rating) - Number(sortedMatchRatings[currentCount].rating);
                totalDifference += difference;
                
                const absoluteValueOfDifference = Math.abs(difference);
                totalAbsoluteValueDifference += absoluteValueOfDifference;

                const combinedRating = mySortedRatings[i].rating + sortedMatchRatings[currentCount].rating;

                biggestDifference = Math.max(biggestDifference, absoluteValueOfDifference);
                smallestDifference = Math.min(smallestDifference, absoluteValueOfDifference);

                highestCombinedRating = Math.max(highestCombinedRating, combinedRating);
                lowestCombinedRating = Math.min(lowestCombinedRating, combinedRating);

                mutualMatches.push({
                    myRating: mySortedRatings[i], 
                    matchRating: sortedMatchRatings[currentCount]
                    })
            }
        }
    }
   
    if(matchContactId && mutualMatches.length > 0) {
        return (
            <div>
                <NavigationMenu />
                <h1>View Match</h1>
                <h2>{matchFirstName} {matchLastName}</h2>
                <br />
                <br />

                <MatchStatisticsTable matchFirstName = {matchFirstName} numberOfMutualMatches = {mutualMatches.length} totalDifference = {totalDifference} totalAbsoluteValueDifference = {totalAbsoluteValueDifference} cellStyle = {cellStyle} />
                
                <PerfectMatchesTable perfectMatches = {mutualMatches.filter((match)=>match.myRating.rating === match.matchRating.rating)} cellStyle = {cellStyle} />

                {smallestDifference > 0 ? ( 
                    <div>
                        <h2>Smallest Difference</h2>
                        <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating - match.matchRating.rating) === smallestDifference)} cellStyle = {cellStyle} differenceFieldPresent = {"true"} combinedFieldPresent = "false" />
                    </div>
                ) : null
                }
                
                <h2>Biggest Differences</h2>
                <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating - match.matchRating.rating) === biggestDifference)} cellStyle = {cellStyle} differenceFieldPresent = {true} combinedFieldPresent = {false} />

                <h2>Highest Combined Rating</h2>
                <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating + match.matchRating.rating) === highestCombinedRating)} cellStyle = {cellStyle} differenceFieldPresent = {false} combinedFieldPresent = {true} />

                <h2>Lowest Combined Rating</h2>
                <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches.filter((match)=>Math.abs(match.myRating.rating + match.matchRating.rating) === lowestCombinedRating)} cellStyle = {cellStyle} differenceFieldPresent = {false} combinedFieldPresent = {true} />

                <h2>All Shared Ratings</h2>
                <MatchComparisonTable matchFirstName = {matchFirstName} matches = {mutualMatches} cellStyle = {cellStyle} differenceFieldPresent = {true} combinedFieldPresent = {true} />

                <h2>All of {matchFirstName}'s ratings</h2>
                <IndividualRatingsTable ratings = {matchRatings} cellStyle = {cellStyle} />

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

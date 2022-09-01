import React, { useEffect, useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';

function MatchComparisonTable({ matchFirstName, matches, cellStyle, differenceFieldPresent, combinedFieldPresent}) {
   
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style = {cellStyle}>Item</th>
                        <th style = {cellStyle}>Category</th>
                        <th style = {cellStyle}>Your Rating</th>
                        <th style = {cellStyle}>{matchFirstName}'s Rating</th>
                        {differenceFieldPresent ? <th style = {cellStyle}>Difference</th>: null }
                        {combinedFieldPresent ? <th style = {cellStyle}>Combined Rating</th>: null }
                        
                    </tr>
                </thead>

                <tbody>
                    {matches.map((match) => (
                        <tr key = {match.myRating.item.id}>
                            <td style = {cellStyle}>{match.myRating.item.name}</td>
                            <td style = {cellStyle}>{match.myRating.item.category.name}</td>
                            <td style = {cellStyle}>{match.myRating.rating}</td>
                            <td style = {cellStyle}>{match.matchRating.rating}</td>
                            {differenceFieldPresent ? <td style = {cellStyle}>{match.myRating.rating - match.matchRating.rating}</td> : null}
                            {combinedFieldPresent ? <td style = {cellStyle}>{match.myRating.rating + match.matchRating.rating}</td> : null}
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

export default MatchComparisonTable;

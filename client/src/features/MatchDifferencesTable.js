import React, { useEffect, useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';

function MatchDifferencesTable({ matchFirstName, matches, cellStyle }) {

    return (
        <div>
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
                    {matches.map((match) => (
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

export default MatchDifferencesTable;

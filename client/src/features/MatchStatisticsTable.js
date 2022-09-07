import React, { useEffect, useState } from 'react';
import '../App.css';

function MatchStatisticsTable({ matchFirstName, numberOfMutualMatches, totalDifference, totalAbsoluteValueDifference, cellStyle }) {

    return (
        //Need to fix average difference.
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <tr>
                        <td style = {cellStyle}><strong>Number of shared matches</strong></td>
                        <td style = {cellStyle}>{numberOfMutualMatches}</td>
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
        </div>
    );
}

export default MatchStatisticsTable;

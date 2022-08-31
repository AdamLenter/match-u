import React, { useEffect, useState } from 'react';
import '../App.css';
import NavigationMenu from './NavigationMenu';

function PerfectMatchesTable({ perfectMatches, cellStyle }) {

    return (
        <div>
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
                    {perfectMatches.length > 0 ? perfectMatches.map((match) => (
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
        </div>
    );
}

export default PerfectMatchesTable;

import React, { useState } from 'react';
import '../App.css';
import RatingRow from './RatingRow';

function IndividualRatingsTable({ ratings, cellStyle }) {
  
 
    return (  
        <table>
            <thead>
                <tr>
                    <th style = {cellStyle}>Category</th>
                    <th style = {cellStyle}>Item</th>
                    <th style = {cellStyle}>Rating</th>
                </tr>
            </thead>
            <tbody>
                {ratings.length > 0 ? ratings.map((rating)=><RatingRow key = {rating.id} rating = {rating}  cellStyle = {cellStyle}/>) : (
                    <tr>
                        <td colSpan = '3'>(no matching items)</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default IndividualRatingsTable;

import React, { useState } from 'react';
import '../App.css';

function RatingRow({ rating, cellStyle }) {
    return (
        <tr>
            <td style = {cellStyle}>{rating.item.category.name}</td>
            <td style = {cellStyle}>{rating.item.name}</td>
            <td style = {cellStyle}>{rating.rating}</td>
        </tr>
    );
}

export default RatingRow;

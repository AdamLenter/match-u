import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function RatingRow({ rating, ratingCanBeEdited, cellStyle }) {

    const [displayRating, setDisplayRating] = useState("rating")

    function displayEditLink() {
        if(ratingCanBeEdited) {
            setDisplayRating(false);
        }
    }

    function displayItemRating() {
        setDisplayRating(true);
    }

    const link = `/editRating/${rating.id}`;

    return (
        <tr>
            <td style = {cellStyle}>{rating.item.category.name}</td>
            <td style = {cellStyle}>{rating.item.name}</td>
            <td style = {cellStyle} onMouseOver = {displayEditLink} onMouseOut = {displayItemRating}>
                {displayRating ? rating.rating : <Link to = {link}>Edit</Link>}
            </td>
        </tr>
    );
}

export default RatingRow;

import React, { useState } from 'react';
import '../App.css';
import IndividualRatingsTable from './IndividualRatingsTable';
import NavigationMenu from './NavigationMenu';
import RatingRow from './RatingRow';

function MyRatings({ userInfo, cellStyle }) {
  
    const [ratingAdded, setRatingAdded] = useState({});
    const[filterTerm, setFilterTerm] = useState("");


    function updateFilter(event) {
        setFilterTerm(event.target.value);
    }

    let filteredRatings = [];

    let sortedRatings = [];

    if(userInfo.contact && userInfo.contact.contact_ratings) {
        if(filterTerm != "") {
            
            filteredRatings = userInfo.contact.contact_ratings.filter((rating) => {
                if(rating.item.name.concat(rating.item.category.name).toLowerCase().includes(filterTerm.toLowerCase())) {
                    return rating;
                }
            })
        }
        else {
            filteredRatings = [...userInfo.contact.contact_ratings];
        }

        sortedRatings = filteredRatings.sort((a, b)=> {
            if(a.name < b.name) {
                return -1;
            }
            else {
                return 1;
            }
        })
    }
 
    return (
        <div>
            <NavigationMenu />
            <br />
            <h1>My Ratings</h1>

            <br />
            <label><strong>Filter Ratings:</strong></label>
            <br />
            <input name = "filterTerm" value = {filterTerm} onChange = {updateFilter} />
            <br />
            <br />
            
            <IndividualRatingsTable ratings = {sortedRatings} ratingCanBeEdited = {true} cellStyle = {cellStyle} />
            {sortedRatings.length > 0 ? (
                <div>
                    <sup>*</sup>Hover over a rating to edit"
                </div>) : null}
            <br />
            <br />
        </div>
    );
}

export default MyRatings;

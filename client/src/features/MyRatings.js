import React, { useState } from 'react';
import '../App.css';
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
            console.log(filterTerm);
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
    console.log(sortedRatings);

  
    

 
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
            
            <table>
                <thead>
                    <tr>
                        <th style = {cellStyle}>Category</th>
                        <th style = {cellStyle}>Item</th>
                        <th style = {cellStyle}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRatings.length > 0 ? sortedRatings.map((rating)=><RatingRow key = {rating.id} rating = {rating}  cellStyle = {cellStyle}/>) : (
                        <tr>
                            <td colSpan = '3'>(no matching items)</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MyRatings;

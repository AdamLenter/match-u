import React, { useState } from 'react';
import '../App.css';
import { Link, useParams } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

function EditRatingScreen({ userInfo, setUserInfo }) {
    
    const params = useParams();

    const [rating, setRating] = useState(0);

    const [ratingUpdated, setRatingUpdated] = useState(false);

    const ratingId = params.ratingId;
    let ratingInfo = {};
    if(ratingId > 0 && userInfo && userInfo.contact && userInfo.contact.contact_ratings && userInfo.contact.contact_ratings.length > 0) {
        //There are ratings
        ratingInfo = userInfo.contact.contact_ratings.find((rating)=>rating.id === Number(ratingId));
    }

    if(rating && rating === 0 && ratingInfo.rating) {
        setRating(ratingInfo.rating);
    }

    let ratingNumbers = [];

    for(let i = 1; i <= 10; i++) {
        ratingNumbers.push(i);
    }

    function updateRating(event) {
        setRating(event.target.value);
    }

    function submitEditRating(event) {
        event.preventDefault();

        const updatedRatingNumber = {
            rating: rating
        }

        fetch(`/contact_ratings/${ratingInfo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(updatedRatingNumber)
            })
            .then((r)=>{
                if(r.ok) {
                    r.json()
                    .then((response)=> {
                        const updatedUserInfo = {...userInfo};

                        let updatedRating = {...ratingInfo};
                        updatedRating.rating = Number(rating);

                        let updatedRatings = userInfo.contact.contact_ratings.map((rating) => {
                            if(rating.id === Number(ratingId)) {
                                return updatedRating;
                            }
                            else {
                                return rating;
                            }
                        })

                        updatedUserInfo.contact.contact_ratings = updatedRatings;
                        setRatingUpdated(true);
                    })
                }
                else {
                    console.log(r);
                }
            })

    }

    function handleDeleteRating() {
        fetch(`/contact_ratings/${ratingInfo.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
                }
            })
            .then((r)=>{
                if(r.ok) {
                    let updatedUserInfo = {...userInfo};

                    let updatedRatings = userInfo.contact.contact_ratings.filter((rating)=>Number(rating.id) !== Number(ratingId));

                    updatedUserInfo.contact.contact_ratings = updatedRatings;

                    setUserInfo(updatedUserInfo);
                }
            })
    }

    const url = `/deleteRating/${ratingId}`
    if(ratingInfo && ratingInfo.rating) {
        return (
            <div>
                <NavigationMenu />
                <br />
                <h1>Edit Rating</h1>
                <h2>{ratingInfo.item.category.name} - {ratingInfo.item.name}</h2>

                {!ratingUpdated ? (
                    <div>
                        <form onSubmit = {submitEditRating}>
                            <label>Rating: </label>
                            <select name = "rating" onChange = {updateRating} value = {rating}>
                                {ratingNumbers.map((ratingNumber) => <option key = {ratingNumber} value = {ratingNumber}>{ratingNumber}</option>)}
                            </select>
                            <br />
                            <br />
                            <button>Submit</button>
                        </form>
                        <br />
                        <br />
                        <Link to = {url} onClick = {handleDeleteRating}>Delete Rating for {ratingInfo.item.name}</Link>
                    </div>
                    ) : (
                    <p>
                        <strong>New Rating: </strong>{rating}
                    </p>
                    )}
                <br />
                <Link to = "/myRatings">Return to my Ratings</Link>
            </div>
        );
    }
    else {
        return (
            <div>
                <NavigationMenu />
                <br />
                <h1>Edit Rating</h1>
                <h2>(rating not found)</h2>
                <br />
                <br />
                <Link to = "/myRatings">Return to My Ratings</Link>
            </div>
        );
    }
}

export default EditRatingScreen;

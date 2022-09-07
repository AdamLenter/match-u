import React, { useState } from 'react';
import AddRatingForm from './AddRatingForm'
import '../App.css';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

function AddRatingScreen({ userInfo, setUserInfo }) {
  
    const [ratingAdded, setRatingAdded] = useState({});

    function handleAddAdditionalRating(){
        setRatingAdded({});
    }

    return (
        <div>
            <NavigationMenu />
            <br />
            <h1>Add a Rating</h1>
            {!ratingAdded.id ? <AddRatingForm userInfo = {userInfo} setUserInfo = {setUserInfo} setRatingAdded = {setRatingAdded} /> : (
                <div>
                    <br />
                    <p>
                        <strong>Rating successfully added:</strong>
                        <br />
                        <strong>Category: </strong>{ratingAdded.item.category.name}
                        <br />
                        <strong>Item: </strong>{ratingAdded.item.name}
                        <br />
                        <strong>Rating: </strong>{ratingAdded.rating}
                        <br />
                        <br />
                        Click <Link to = "/addARating" onClick = {handleAddAdditionalRating}>here</Link> to add another rating
                        <br />
                        <br />
                        <Link to = "/myRatings">Return to My Ratings</Link>
                    </p>
                </div>
    )}
        </div>
    );
}

export default AddRatingScreen;

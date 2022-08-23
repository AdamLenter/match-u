import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AddRatingForm from './AddRatingForm'
import '../App.css';
import { Link } from 'react-router-dom';

function AddRatingScreen({ userInfo, setUserInfo }) {
  
    const [ratingAdded, setRatingAdded] = useState({});

    function handleAddAdditionalRating(){
        setRatingAdded({});
    }

console.log(ratingAdded);
    return (
        <div>
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
                    </p>
                </div>
    )}
        </div>
    );
}

export default AddRatingScreen;

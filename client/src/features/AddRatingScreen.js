import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AddRatingForm from './AddRatingForm'
import '../App.css';

function AddRatingScreen({ userInfo, setUserInfo }) {
  
    const [ratingAdded, setRatingAdded] = useState(false);


    return (
        <div>
            <h1>Add a Rating</h1>
            {!ratingAdded ? <AddRatingForm userInfo = {userInfo} setUserInfo = {setUserInfo} setRatingAdded = {setRatingAdded} /> : null}
        </div>
    );
}

export default AddRatingScreen;

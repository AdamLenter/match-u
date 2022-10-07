import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import '../App.css';
import {Link} from 'react-router-dom';

function AddRatingForm({ userInfo, setUserInfo, setRatingAdded }) {
  
    const items = useSelector((state)=>state.items.items);
    const [errorMessages, setErrorMessages] = useState([]);

    let ratings = [];

    const blankFormData =  {
        itemToRate: "", 
        rating: 10
    };

    const [formData, setFormData] = useState(blankFormData);

    for (let i = 1; i <= 10; i++) {
        ratings.push(i);
    }

    function updateItemToRate(event) {
        const updatedFormData = {...formData};
        updatedFormData[event.target.name] = event.target.value;
        setFormData(updatedFormData);
    }

    function submitAddRatingForm(event) {
        event.preventDefault();

        const itemId = items.find((item) => item.category.name.concat(" - ", item.name) === formData.itemToRate).id;

        if(itemId) {
            const ratingForDb = {
                contact_id: userInfo.contact.id, 
                item_id: itemId, 
                rating: formData.rating
            }

            fetch("/contact_ratings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ratingForDb)
            }) 
            .then((response) => {
                if (response.ok) {
                    response.json().then((createdRating)=>{

                        let updatedContactRatings = [...userInfo.contact.contact_ratings];

                        updatedContactRatings.push(createdRating);
                        
                        const updatedUser = {...userInfo};

                        updatedUser.contact.contact_ratings = updatedContactRatings;

                        setUserInfo(updatedUser);

                        setFormData(blankFormData);
                        setRatingAdded(createdRating);
                    })
                }
                else {
                    response.json().then((errorData) => setErrorMessages(errorData.errors));
                }
            })
        }
    }

    let itemsToDisplay = []
    let sortedItemsToDisplay = [];
    if(items && items.length > 0) {
       
        itemsToDisplay = [...items];

        sortedItemsToDisplay = itemsToDisplay.sort((a, b) => {
            if(a.category.name.concat(a.name) < b.category.name.concat(b.name)) {
                return -1;
            }
            else {
                return 1;
            }
        })
        if(userInfo.contact && userInfo.contact.contact_ratings) {
            userInfo.contact.contact_ratings.forEach((rating)=> {
                const itemIndex = itemsToDisplay.findIndex((item)=>item.id === rating.item.id);
                itemsToDisplay.splice(itemIndex, 1);
            })
        }
    }
    
    if(itemsToDisplay && itemsToDisplay.length > 0) {
        return (
            <div>
                {errorMessages ? (
                    <div>
                        {errorMessages.map((message)=><p className = "errorMessage" key = {message}>{message}</p>)}
                    </div>
                ) : null}
                <form onSubmit = {submitAddRatingForm}>
                    <label>Item to Rate: </label>
                    <input type = "text" name = "itemToRate" list="data" value = {formData.itemToRate} onChange = {updateItemToRate} />

                    <datalist id="data">
                        {sortedItemsToDisplay.map((item) =>
                        <option key={item.id}>{item.category.name} - {item.name}</option>
                        )}
                    </datalist>
                    <br />

                    <label>Rating: </label>
                    <select name = "rating" value = {formData.rating} onChange={updateItemToRate}>
                        {
                        ratings.map((rating)=><option key = {rating} value = {rating}>{rating}</option>)
                        }
                    </select>
                    <br />
                    <button>Submit</button>
                </form>
                <br />
                <br />
                <p>
                    <strong>Not seeing your item?</strong>
                    <br />
                    Click <Link to = '/addItem'>here</Link> to add a new one.
                </p>
            </div>
        );
    }
    else {
        return(
            <p><strong>Form loading...</strong></p>
        );
    }
}

export default AddRatingForm;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import '../App.css';
import { fetchItems, selectAllItems } from './items/itemsSlice';

function AddRatingForm() {

   const items = useSelector((state)=>state.items.items);
    
    function submitAddRatingForm(event) {
        event.preventDefault();
    }

    const [formData, setFormData] = useState({
        itemId: null, 
        itemRating: 10
    })

    if(!formData.itemId && items[0]) {
        const updatedFormData = {...formData};
        updatedFormData.itemId = items[0].id;
        setFormData(updatedFormData);
    }

    function updateItemToRate(event) {
        const updatedFormData = {...formData};
        updatedFormData.itemId = items.find((item)=>item.category.name.concat(" - ", item.name) === event.target.value).id;
        setFormData(updatedFormData);
    }
  
    let ratings = [];

    for (let i = 1; i <= 10; i++) {
        ratings.push(i);
    }

    return (
        <div>
            <h1>Add a Rating</h1>
            <form onSubmit = {submitAddRatingForm}>
                <label>Item to Rate: </label>
                <input name = "itemToRate" type="text" list="data" onChange = {updateItemToRate} />

                <datalist id="data">
                    {items.map((item) =>
                    <option key={item.id}>{item.category.name} - {item.name}</option>
                    )}
                </datalist>
                <br />

                <label>Rating</label>
                <select name = "itemRating" value = {formData.itemRating}>
                    {
                    ratings.map((rating)=><option value = {rating}>{rating}</option>)
                    }
                </select>
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default AddRatingForm;

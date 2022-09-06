import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import { addItem } from './items/itemsSlice';
import { useDispatch } from 'react-redux';

function AddItemScreen({ categories }) {

    const dispatch = useDispatch();
    const[errorMessages, setErrorMessages] = useState([]);

    const [item, setItem] = useState({});

    const [formData, setFormData] = useState({
        categoryId: null, 
        itemName: ""
    })

    if(categories.length > 0 && !formData.categoryId) {
        let updatedFormData = {...formData};
        updatedFormData.categoryId = categories[0].id;
        setFormData(updatedFormData);
    }

    function handleUpdateAddItemForm(event) {
        setErrorMessages([]);
        let updatedFormData = {...formData};
        updatedFormData[event.target.name] = event.target.value;
        setFormData(updatedFormData);
    }

    function submitAddItemForm(event) {
        event.preventDefault();
        setErrorMessages([]);
        if(formData.itemName !== "") {
            {
            const formDataForDb = {
                category_id: formData.categoryId,
                name: formData.itemName
                }

                fetch("/items", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formDataForDb)
                    })
                .then((r)=>{
                    if(r.ok) {
                        r.json()
                        .then((itemInfo)=> {
                            setItem(itemInfo);
                            dispatch(addItem(itemInfo));
                        })
                    }
                    else {
                        r.json()
                        .then((errors)=>setErrorMessages(errors.errors));
                    }
                })

            }
        }
    }
    
console.log(item);
    if(formData.categoryId > 0) {
        if(!item.name) {
            return (
                <div>
                    <NavigationMenu />
                    <h1>Add an Item</h1>
                    <br />
                    {errorMessages.length > 0 ? errorMessages.map((message)=>(<p key = {message} className = "errorMessage">{message}</p>)) : null}
                    <form onSubmit = {submitAddItemForm}>
                        <label>Category: </label>
                        <select name = "categoryId" value = {formData.categoryId} onChange = {handleUpdateAddItemForm}>
                            {categories.map((category)=><option key = {category.id} value = {category.id}>{category.name}</option>)}
                        </select>
                        <br />
                        <br />

                        <label>Item name: </label>
                        <input name = "itemName" value = {formData.itemName} onChange = {handleUpdateAddItemForm}/>
                        <br />
                        <br />
                        <button>Submit</button>
                    </form>
                </div>
            );
        }
        else {
            return(
                <div>
                    <h1>Add an Item</h1>
                    <p>
                        <strong>Item successfully added:</strong>
                        <br />
                        <strong>Category: </strong>{item.category.name}
                        <br />
                        <strong>Name: </strong>{item.name}
                        <br />
                        <br />
                        Click <Link to = "/addARating">here</Link> to add a rating.
                    </p>
                </div>
            )
        }
    }
    else {
        return (
            <div>
                <NavigationMenu />
                <h1>Add an Item</h1>
                <h2>Form loading...</h2>
            </div>
        );
    }
}

export default AddItemScreen;

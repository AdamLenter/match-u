import React, { useState } from 'react';
import '../App.css';

function CreateAccountForm({ setUserCreated, errorMessage, setErrorMessage }) {
    const [formData, setFormData] = useState({
        firstName: "", 
        lastName: "", 
        username: "", 
        password: "", 
        confirmPassword: ""
    });
    
    function handleFormChange(event) {
        const updatedFormData = {...formData};

        updatedFormData[event.target.name] = event.target.value;

        setFormData(updatedFormData);

        if(updatedFormData.password && updatedFormData.confirmPassword) {
            if(updatedFormData.password === updatedFormData.confirmPassword) {
                if(errorMessage) {
                    setErrorMessage("");
                    document.getElementById("submitButton").disabled = false;
                }
            }
            else {
                if(!errorMessage) {
                    setErrorMessage("Passwords do not match.");
                    document.getElementById("submitButton").disabled = true;
                }
            }
        }
        else {
            document.getElementById("submitButton").disabled = true;
        }
    }

    function submitForm(event){
        event.preventDefault();

        const dataForDatabase = {
            first_name: formData.firstName, 
            last_name: formData.lastName, 
            username: formData.username, 
            password: formData.password, 
            password_confirmation: formData.confirmPassword
        }

        fetch("/users", {
        method: "post",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForDatabase)
        })
        .then((r)=>r.json())
        .then((userInfo)=>{
            if(userInfo.username) {
                setUserCreated(true);
            }
            else {
                setErrorMessage("There was an error creating your account. Please try again.");
            }
        });
    }
  
    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={submitForm}>
                <label>First name: </label>
                <input name = "firstName" value = {formData.firstName} onChange = {handleFormChange} />
                <br />
                <br />
                
                <label>Last name: </label>
                <input name = "lastName" value = {formData.lastName} onChange = {handleFormChange} />
                <br />
                <br />
                
                <label>Username: </label>
                <input name = "username" value = {formData.username} onChange = {handleFormChange} />
                <br />
                <br />
                
                <label>Password: </label>
                <input name = "password" type = "password" value = {formData.password} onChange = {handleFormChange} />
                <br />
                <br />
                
                <label>Confirm password: </label>
                <input name = "confirmPassword" type = "password" value = {formData.confirmPassword} onChange = {handleFormChange} />
                <br />
                <br />

                <button id = "submitButton" disabled = {true}>Submit</button>
                <br />
                <br />
            </form>
        </div>
    );
}

export default CreateAccountForm;

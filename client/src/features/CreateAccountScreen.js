import React, { useState } from 'react';
import '../App.css';
import CreateAccountForm from './CreateAccountForm';
import {Link} from 'react-router-dom';

function CreateAccountScreen() {
    const [formData, setFormData] = useState({
        firstName: "", 
        lastName: "", 
        username: "", 
        password: "", 
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [userCreated, setUserCreated] = useState(false);
  
    if(!userCreated) {
        return (
            <div>
                <CreateAccountForm setUserCreated = {setUserCreated} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />
                {errorMessage ? <div className = "errorMessage">{errorMessage}</div> : null}
            </div>
        );
    }
    else {
        return (
            <div>
                <h2>User Successfully Created</h2>
                <p>
                    Click <Link to = "/">here</Link> to login
                </p>
            </div>
        )
    }
}

export default CreateAccountScreen;

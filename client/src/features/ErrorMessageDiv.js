import React from 'react';
import '../App.css';

function ErrorMessageDiv({ errorMessage }) {
   
    return (
        <div>
            <p className = "errorMessage">{errorMessage}</p>
        </div>
    );
}

export default ErrorMessageDiv;

import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Link } from "react-router-dom";
import NavigationMenu from './NavigationMenu';

function Home({ userInfo, setUserInfo }) {
  
  const [formData, setFormData] = useState({
    username: "", 
    password: ""
  });

  const [loginError, setLoginError] = useState("");

  function updateForm(event) {
    const updatedFormData = {...formData}

    updatedFormData[event.target.name] = event.target.value;
    setFormData(updatedFormData);
  }

  function handleLogin(event) {
    event.preventDefault();
   
    fetch("/login", {
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(formData)
      })
      .then((response) => {
          if (response.ok) {
            response.json().then((userInfo)=>{
              setUserInfo(userInfo);
              setLoginError("")
            });
          } else {
            setLoginError("Username/password combination invalid. Please try again.");
          }
      })
    }

  function handleLogout() {
    console.log("Hello");
    fetch("/logout", {
        method: "DELETE"})
        .then (()=> {
            setUserInfo({});
            console.log(userInfo);
        })
    }
  
  if(!userInfo['username']) {
    return (
      <div>
        <header className="App-header">
          <h1>Match U</h1>
        
          {loginError ? <div className = "errorMessage">{loginError}</div> : null}
          <form onSubmit={handleLogin}>
            <label>Username: </label>
            <input value = {formData.username} name = "username" onChange = {updateForm} />
            <br />
            <br />

            <label>Password: </label>
            <input value = {formData.password} name = "password" type = "password" onChange = {updateForm} />
            <br />
            <br />
            <button>Submit</button>
          </form>
          <br />
          <br />
          <div>
            Click <Link to = "createAccount">here</Link> to create an account
          </div>
        </header>
      </div>  
    );
  }
else {
  return (
    <div>
      <NavigationMenu />
      <h1>Welcome Home!</h1>
      <p onClick = {handleLogout}>logout</p>
    </div>
  )
}
}

export default Home;

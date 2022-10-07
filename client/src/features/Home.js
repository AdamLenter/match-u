import React, { useState } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import NavigationMenu from './NavigationMenu';
import thumbs from './thumbs_up_down.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from './matches/matchesSlice';
import { fetchItems } from './items/itemsSlice';

function Home({ userInfo, setUserInfo }) {
  const items = useSelector((state)=>state.items.items);
  const dispatch = useDispatch();
  
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
              dispatch(fetchMatches(userInfo.contact.id));
              dispatch(fetchItems());
              setLoginError("")
            });
          } else {
            setLoginError("Username/password combination invalid. Please try again.");
          }
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
      <br />
      <h1>Welcome to Match U!</h1>
      <img src={thumbs} className = "logo" alt = "thumbs up and down images" />
    </div>
  )
}
}

export default Home;

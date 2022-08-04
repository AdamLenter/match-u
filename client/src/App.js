import React, { useState, useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './features/Home';
import CreateAccountScreen from './features/CreateAccountScreen';

function App() {

  const [userInfo, setUserInfo] = useState({});

  useEffect(()=> {
    fetch("/me")
    .then((r)=>r.json())
    .then((user)=>{
      if(user['username']) {
        setUserInfo(user);
        }
    })
  }, [])
  
  return (
    <div className="App">
        <Routes>
          <Route path="/createAccount/" element={<CreateAccountScreen />} />
          <Route path="/" element={<Home userInfo = {userInfo} setUserInfo = {setUserInfo} />} />
        </Routes>
    </div>
  );
}

export default App;

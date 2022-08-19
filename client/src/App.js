import React, { useState, useEffect } from 'react';
// import { Items } from './features/items/Items';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './features/Home';
import CreateAccountScreen from './features/CreateAccountScreen';
import AddRatingForm from './features/AddRatingForm';
import { fetchItems } from './features/items/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const [userInfo, setUserInfo] = useState({});

  // useEffect(()=> {
  //   fetchItems()  
  //     }, [])

  const dispatch = useDispatch();

  const items = useSelector((state)=>state.items.items);

  console.log(items);

  useEffect(()=> {
    fetch("/me")
    .then((r)=>r.json())
    .then((user)=>{
      if(user['username']) {
        setUserInfo(user);
        }
    })
    dispatch(fetchItems());
  }, [])

  return (
    <div className="App">
        <Routes>
          <Route path="/createAccount/" element={<CreateAccountScreen />} />
          <Route path="/addARating" element={<AddRatingForm />} />
          <Route path="/" element={<Home userInfo = {userInfo} setUserInfo = {setUserInfo} />} />
        </Routes>
    </div>
  );
}

export default App;

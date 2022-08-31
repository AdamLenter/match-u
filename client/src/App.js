import React, { useState, useEffect } from 'react';
// import { Items } from './features/items/Items';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './features/Home';
import CreateAccountScreen from './features/CreateAccountScreen';
import AddRatingScreen from './features/AddRatingScreen';
import { fetchItems } from './features/items/itemsSlice';
import { fetchMatches } from './features/matches/matchesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MyRatings from './features/MyRatings';
import MakeMatchScreen from './features/MakeMatchScreen';
import ReceiveMatchScreen from './features/ReceiveMatchScreen';
import PendingMatchScreen from './features/PendingMatchScreen';
import MyMatchesScreen from './features/MyMatchesScreen';
import ViewMatchScreen from './features/ViewMatchScreen';

function App() {

  const [userInfo, setUserInfo] = useState({});
  
  const dispatch = useDispatch();

  const items = useSelector((state)=>state.items.items);
  const matches = useSelector((state)=>state.matches.matches);
  const [match, setMatch] = useState({});

  const cellStyle = {
    border: '1px solid black', 
};

  useEffect(()=> {
    fetch("/me")
    .then((r)=>r.json())
    .then((user)=>{
      if(user['username']) {
        setUserInfo(user);
        if(matches.length === 0) {
          dispatch(fetchMatches(user.contact.id));
        }
        }
    }
    )
    .then(()=>{
      if(items.length === 0) {
        dispatch(fetchItems());
      }
    })
  }, [])
  return (
    <div className="App">
        <Routes>
          <Route path="/createAccount/" element={<CreateAccountScreen />} />
          <Route path="/myRatings" element={<MyRatings userInfo = {userInfo} cellStyle = {cellStyle} />} />
          <Route path="/addARating" element={<AddRatingScreen userInfo = {userInfo}  setUserInfo = {setUserInfo} />} />
          <Route path="/makeMatch" element={<MakeMatchScreen userInfo = {userInfo} />} />
          <Route path="/receiveMatch" element={<ReceiveMatchScreen userInfo = {userInfo} />} />
          <Route path="/pendingMatches" element={<PendingMatchScreen userInfo = {userInfo} cellStyle = {cellStyle} />} />
          <Route path="/myMatches" element={<MyMatchesScreen userInfo = {userInfo} setMatch = {setMatch} cellStyle = {cellStyle} />} />
          <Route path="/viewMatch" element={<ViewMatchScreen userInfo={userInfo} match = {match} cellStyle = {cellStyle} />} />
          <Route path="/" element={<Home userInfo = {userInfo} setUserInfo = {setUserInfo} />} />
        </Routes>
    </div>
  );
}

export default App;

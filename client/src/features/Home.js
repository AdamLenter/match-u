import React from 'react';
import '../App.css';
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  
  return (
    <div>
      Click <Link to = "CreateAccount">here</Link> to create an account
    </div>
  );
}

export default Home;

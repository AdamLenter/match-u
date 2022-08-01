import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './features/Home';
import CreateAccount from './features/CreateAccount';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Match U</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

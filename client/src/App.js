import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './features/Home';
import CreateAccountScreen from './features/CreateAccountScreen';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Match U</h1>
        <Routes>
          <Route path="/createAccount/" element={<CreateAccountScreen />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

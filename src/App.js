import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch, ( changed to 'Routes' in v6 of 'react-router-dom')
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Admission from './Components/Admission';
import Query from './Components/Query';
import Navbar from './Components/Navbar';
import Copyright from './Components/Copyright';
import Home from './Components/Home';

function App() {
  return (
    <Router>
        <Navbar />
        
        
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/query" element={<Query />} />
          </Routes>
      <Copyright />
      </Router>
  );
}

export default App;

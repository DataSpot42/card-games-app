import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import TwentyOne from './pages/twentyOne'
import Home from './pages/home'
import './App.css';
import NavBar from '../src/components/navBar'
import DealTest from './pages/dealTest'


const App = () => {
  return (
    <div>
      <BrowserRouter>      
        <div>        
        <NavBar />
        <Routes>
        <Route
        path='/'
        element={<Home />}
        />
        <Route
        path='/TwentyOne'
        element={<TwentyOne />}
        />
         <Route
        path='/DealTest'
        element={<DealTest />}
        />
        </ Routes>
        </div>
        </BrowserRouter>
        </div>
  )
}

export default App;

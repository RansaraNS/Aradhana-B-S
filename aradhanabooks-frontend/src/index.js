import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Sasin/Home.js';
import ItemDetails from '../src/Pages/Sasin/ItemDetails.js';
import ItemH from './Pages/Sasin/ItemH.js';
import HomeReqBar from './Components/Sasin/HomeReqBar.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/item' element={<ItemDetails />} />
      <Route path='/itemH' element={<ItemH />} />
      <Route path='/Req' element={<HomeReqBar />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from "./navigation"; // Import the new App that uses React Router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   

   <BrowserRouter>
     <Navigation />
   </BrowserRouter>

  </React.StrictMode>,
);
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position='top-right'
      autoClose={4000}
      pauseOnHover />
  </BrowserRouter>
)
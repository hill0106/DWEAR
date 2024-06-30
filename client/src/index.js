import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'; // Corrected import path for react-toastify

import { ToastContainer } from 'react-toastify'; // Removed unused import 'toast'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position='bottom-center'
        autoClose={2000}
        hideProgressBar={true}
        closeButton={false}
        theme='colored'
        icon={false}
      />
    </BrowserRouter>
  </React.StrictMode>
);

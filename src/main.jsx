import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from './Auth.jsx'; //for the authentication page
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
);


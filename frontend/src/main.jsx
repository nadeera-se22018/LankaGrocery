import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; 
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || '';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <PayPalScriptProvider deferLoading={true}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </PayPalScriptProvider>
    </HelmetProvider>
  </React.StrictMode>,
);


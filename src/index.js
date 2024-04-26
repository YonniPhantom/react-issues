import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'tailwindcss/tailwind.css';
import 'react-notifications/lib/notifications.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

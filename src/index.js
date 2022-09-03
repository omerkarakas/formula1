import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>
);

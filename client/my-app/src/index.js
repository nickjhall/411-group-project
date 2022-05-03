import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App.js';
import { createRoot } from "react-dom/client"

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

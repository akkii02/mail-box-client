import React from 'react';
import ReactDOM from 'react-dom';  // Correct import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./Components/store/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
    </Provider>
);

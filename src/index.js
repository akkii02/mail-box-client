import React from 'react';
import ReactDOM from 'react-dom';  
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./Components/store/store"
import { BrowserRouter } from 'react-router-dom';
import { ReRenderProvider } from './Components/store/reRenderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ReRenderProvider>
    <Provider store={store}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
    </Provider>
  </ReRenderProvider>
  </BrowserRouter>
);

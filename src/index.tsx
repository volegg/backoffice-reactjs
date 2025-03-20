import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { getStore } from './store/store';
import { initLogger } from './utils/logger/initLogger';

import './index.css';

initLogger();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={getStore()}>
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals(console.log);

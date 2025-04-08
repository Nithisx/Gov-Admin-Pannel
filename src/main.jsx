import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FormDetailsProvider } from './Components/FormDetailsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FormDetailsProvider>
    <App />
  </FormDetailsProvider>
);

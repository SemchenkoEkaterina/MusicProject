import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TracksStore from './store/TracksStore';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);

root.render(
  <Context.Provider value = {{
    user: new UserStore(),
    tracks: new TracksStore()
  }}>
    <App />
  </Context.Provider>
);

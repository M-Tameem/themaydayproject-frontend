// src/App.js

import React from 'react';
import CallsList from './components/CallsList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>911 Calls Dashboard</h1>
      <CallsList />
    </div>
  );
}

export default App;

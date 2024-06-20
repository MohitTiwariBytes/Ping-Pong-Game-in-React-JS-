import React from 'react';
import Game from './Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="arcade-container">
        <div className="arcade-screen">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;

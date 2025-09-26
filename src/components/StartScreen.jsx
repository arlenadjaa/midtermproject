import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';

const StartScreen = () => {
  const [name, setName] = useState('');
  const { startGame } = useGameState();

  const handleStart = () => {
    if (name.trim()) {
      startGame(name.trim());
    } else {
      alert('Please enter your name, hunter!');
    }
  };

  return (
    <div className="start-screen">
      <h1>Aswang Hunter</h1>
      <p>Enter your name to begin your journey into the darkness.</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        aria-label="Player Name"
      />
      <button onClick={handleStart}>Begin the Hunt</button>
    </div>
  );
};

export default StartScreen;
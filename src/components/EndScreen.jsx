import React from 'react';
import { useGameState } from '../context/GameStateContext';
import storyData from '../data/story.json';

const EndScreen = () => {
  const { gameState, resetGame } = useGameState();
  const endNode = storyData[gameState.currentNodeKey];

  return (
    <div className="end-screen">
      <h2>{endNode.text.includes('GAME OVER') ? 'Game Over' : 'Victory!'}</h2>
      <p>{endNode.text}</p>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
};

export default EndScreen;
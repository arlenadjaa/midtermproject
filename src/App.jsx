import React from 'react';
import GameStateProvider, { useGameState } from './context/GameStateContext';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import './App.css'; // We will create this file for styling

const AppContent = () => {
  const { gameState } = useGameState();

  return (
    <div className="app-container">
      {gameState.gameStarted ? <GameScreen /> : <StartScreen />}
    </div>
  );
};

const App = () => {
  return (
    <GameStateProvider>
      <AppContent />
    </GameStateProvider>
  );
};

export default App;
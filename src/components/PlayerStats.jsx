import React from 'react';
import { useGameState } from '../context/GameStateContext';

const PlayerStats = () => {
  const { gameState } = useGameState();

  return (
    <div className="player-stats">
      <div className="stat">
        <strong>Hunter:</strong> {gameState.playerName}
      </div>
      <div className="stat">
        <strong>HP:</strong> <span className={gameState.hp < 50 ? 'low-hp' : ''}>{gameState.hp} / 100</span>
      </div>
      <div className="stat">
        <strong>Inventory:</strong> {gameState.inventory.length > 0 ? gameState.inventory.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default PlayerStats;
import React from 'react';
import { useGameState } from '../context/GameStateContext';

const PlayerStats = () => {
  const { gameState } = useGameState();
  const hpPercentage = (gameState.hp / 100) * 100;

  // This function determines the color of the HP bar
  const getHpBarColor = () => {
    if (hpPercentage > 60) {
      return '#6bcf6b'; // Green
    }
    if (hpPercentage > 30) {
      return '#e0ac4c'; // Yellow
    }
    return '#e06c75'; // Red (our theme color)
  };

  return (
    <div className="player-stats">
      <div className="stat">
        <strong>Hunter:</strong> {gameState.playerName}
      </div>

      {/* --- HP BAR STRUCTURE --- */}
      <div className="stat-hp">
        <div className="hp-bar-container">
          {/* The inner bar's width is set dynamically based on player HP */}
          <div
            className="hp-bar-fill"
            style={{ 
              width: `${hpPercentage}%`,
              backgroundColor: getHpBarColor() 
            }}
          ></div>
          {/* The text sits on top of the bar */}
          <div className="hp-bar-text">
            HP: {gameState.hp} / 100
          </div>
        </div>
      </div>
      {/* --- END HP BAR --- */}

      <div className="stat">
        <strong>Inventory:</strong> {gameState.inventory.length > 0 ? gameState.inventory.join(', ') : 'None'}
      </div>
    </div>
  );
};

export default PlayerStats;
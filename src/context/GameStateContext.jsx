import React, { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import storyData from '../data/story.json';

const GameStateContext = createContext();

// Custom hook to easily consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const useGameState = () => useContext(GameStateContext);

// The initial state of the game
const initialState = {
  playerName: '',
  hp: 100,
  inventory: [],
  currentNodeKey: 'start',
  gameStarted: false,
};

const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useLocalStorage('aswangHunterState', initialState);

  // Function to start a new game
  const startGame = (name) => {
    setGameState({
      ...initialState,
      playerName: name,
      gameStarted: true,
    });
  };

  // Function to reset the game
  const resetGame = () => {
    setGameState(initialState);
  };

  // The core logic for handling a player's choice
  const handleChoice = useCallback((choice) => {
    const currentNode = storyData[gameState.currentNodeKey];
    if (currentNode.isEnding) return; // Don't process choices on an ending screen

    // 1. Apply effects from the current node
    let newHp = gameState.hp;
    let newInventory = [...gameState.inventory];

    if (currentNode.onArrive) {
      if (currentNode.onArrive.addItem && !gameState.inventory.includes(currentNode.onArrive.addItem)) {
        newInventory.push(currentNode.onArrive.addItem);
      }
      if (currentNode.onArrive.takeDamage) {
        newHp -= currentNode.onArrive.takeDamage;
      }
    }

    // 2. Move to the next node
    const nextNodeKey = choice.to;
    const nextNode = storyData[nextNodeKey];

    // 3. Apply effects from the chosen path (if any)
    if (nextNode.onArrive) {
        if (nextNode.onArrive.addItem) {
            newInventory.push(nextNode.onArrive.addItem);
        }
        if (nextNode.onArrive.takeDamage) {
            newHp -= nextNode.onArrive.takeDamage;
        }
    }

    // Check for HP-loss game over condition
    if (newHp <= 0) {
      setGameState(prev => ({
        ...prev,
        hp: 0,
        currentNodeKey: 'gameOver_hp',
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        hp: newHp,
        inventory: newInventory,
        currentNodeKey: nextNodeKey,
      }));
    }
  }, [gameState, setGameState]);

  const value = {
    gameState,
    startGame,
    resetGame,
    handleChoice,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
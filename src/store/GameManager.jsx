import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedKnowledge, setUnlockedKnowledge] = useState([]);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  
  const unlockKnowledge = (fragmentId) => {
    if (!unlockedKnowledge.includes(fragmentId)) {
      setUnlockedKnowledge((prev) => [...prev, fragmentId]);
    }
  };

  const advanceLevel = () => {
    if (currentLevel < 4) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setEndTime(Date.now());
      setCurrentLevel('end');
    }
  };

  return (
    <GameContext.Provider value={{
      currentLevel,
      setCurrentLevel,
      unlockedKnowledge,
      unlockKnowledge,
      advanceLevel,
      startTime,
      endTime
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameManager = () => useContext(GameContext);

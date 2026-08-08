import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 16;
const THIRSTY_MS = 4000; // Turns yellow after 4s (more forgiving)
const DEAD_MS = 8000; // Turns red after 8s

export const useFarming = (onComplete) => {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill(null));
  const [gameActive, setGameActive] = useState(true);
  const [score, setScore] = useState(0);

  // Win condition checker
  useEffect(() => {
    if (!gameActive) return;
    const isFullAndNotRed = grid.every(item => item !== null && item.state !== 'red');
    if (isFullAndNotRed) {
      setGameActive(false);
      onComplete(score);
    }
  }, [grid, gameActive, onComplete, score]);

  // Dynamic Spawner loop
  useEffect(() => {
    if (!gameActive) return;
    
    let timeoutId;

    const spawnCycle = () => {
      // Random interval between 1.5s and 3.5s
      const nextInterval = Math.floor(Math.random() * 2000) + 1500;
      
      timeoutId = setTimeout(() => {
        setGrid(prev => {
          const emptyIndices = prev
            .map((item, index) => (item === null ? index : null))
            .filter(val => val !== null);

          if (emptyIndices.length === 0) {
            return prev;
          }

          // Randomly spawn 1 or 2 items
          const spawnCount = Math.min(emptyIndices.length, Math.random() > 0.5 ? 2 : 1);
          const newGrid = [...prev];
          
          // Shuffle empty spots to pick random ones
          const shuffledEmpty = [...emptyIndices].sort(() => 0.5 - Math.random());
          
          for (let i = 0; i < spawnCount; i++) {
            newGrid[shuffledEmpty[i]] = {
              id: Date.now() + i, // ensure unique ID
              spawnTime: Date.now(),
              lastWateredTime: Date.now(),
              state: 'healthy'
            };
          }
          
          return newGrid;
        });

        // Continue the cycle
        spawnCycle();
      }, nextInterval);
    };

    spawnCycle();

    return () => clearTimeout(timeoutId);
  }, [gameActive]);

  // Dry out checker loop
  useEffect(() => {
    if (!gameActive) return;

    const checkInterval = setInterval(() => {
      setGrid(prev => {
        let changed = false;
        const now = Date.now();
        const newGrid = prev.map(item => {
          if (item && item.state !== 'dead') {
            const timeSinceWater = now - item.lastWateredTime;
            let newState = item.state;
            
            if (timeSinceWater > DEAD_MS) {
              newState = 'red';
              if (!item.deductedRed) {
                setScore(s => s - 15); // Deduct 15
                item.deductedRed = true;
                item.penalty = -15;
                item.penaltyColor = 'red';
                item.penaltyId = Date.now() + '-r';
              }
            } else if (timeSinceWater > THIRSTY_MS) {
              newState = 'yellow';
              if (!item.deductedYellow) {
                setScore(s => s - 10); // Deduct 10
                item.deductedYellow = true;
                item.penalty = -10;
                item.penaltyColor = 'yellow';
                item.penaltyId = Date.now() + '-y';
              }
            } else {
              newState = 'healthy';
            }

            if (newState !== item.state) {
              changed = true;
              return { ...item, state: newState };
            }
          }
          return item;
        });
        return changed ? newGrid : prev;
      });
    }, 200);

    return () => clearInterval(checkInterval);
  }, [gameActive]);

  const waterCrust = useCallback((index) => {
    if (!gameActive) return;
    setGrid(prev => {
      const item = prev[index];
      if (item && (item.state === 'healthy' || item.state === 'yellow' || item.state === 'red')) {
        let reward = 10;
        if (item.state === 'yellow') reward = 5;
        if (item.state === 'red') reward = 2;
        setScore(s => s + reward); // Gain points based on state
        const newGrid = [...prev];
        newGrid[index] = { ...item, lastWateredTime: Date.now(), state: 'healthy', deductedYellow: false, deductedRed: false };
        return newGrid;
      }
      return prev;
    });
  }, [gameActive]);

  const restart = () => {
    setGrid(Array(GRID_SIZE).fill(null));
    setGameActive(true);
    setScore(0);
  };

  return { grid, waterCrust, restart, score };
};

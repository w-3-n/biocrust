import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 16;
const THIRSTY_MS = 3000; // Turns yellow after 3 seconds
const DEAD_MS = 6000; // Dies after 6 seconds

export const useFarming = (onComplete) => {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill(null));
  const [gameActive, setGameActive] = useState(true);

  // Win condition checker
  useEffect(() => {
    if (!gameActive) return;
    const isFull = grid.every(item => item !== null);
    if (isFull) {
      const allAlive = grid.every(item => item && item.state !== 'dead');
      if (allAlive) {
        setGameActive(false);
        onComplete();
      }
    }
  }, [grid, gameActive, onComplete]);

  // Dynamic Spawner loop
  useEffect(() => {
    if (!gameActive) return;
    
    let timeoutId;

    const spawnCycle = () => {
      // Random interval between 1s and 5s (1000ms to 5000ms)
      const nextInterval = Math.floor(Math.random() * 4000) + 1000;
      
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
              newState = 'dead';
            } else if (timeSinceWater > THIRSTY_MS) {
              newState = 'thirsty';
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
      if (item && (item.state === 'healthy' || item.state === 'thirsty')) {
        const newGrid = [...prev];
        newGrid[index] = { ...item, lastWateredTime: Date.now(), state: 'healthy' };
        return newGrid;
      }
      return prev;
    });
  }, [gameActive]);

  const restart = () => {
    setGrid(Array(GRID_SIZE).fill(null));
    setGameActive(true);
  };

  const hasFailed = grid.some(item => item && item.state === 'dead');

  useEffect(() => {
    if (hasFailed) {
      setGameActive(false);
    }
  }, [hasFailed]);

  return { grid, waterCrust, restart, hasFailed };
};

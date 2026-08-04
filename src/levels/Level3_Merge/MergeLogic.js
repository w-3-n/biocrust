import { useState, useEffect } from 'react';

const GRID_SIZE = 16;
const WIN_TIER = 5;

export const useMergeGame = (onComplete) => {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill(null));

  useEffect(() => {
    // Start with two adjacent tier 1 items
    const newGrid = Array(GRID_SIZE).fill(null);
    newGrid[5] = { id: Date.now(), tier: 1 };
    newGrid[6] = { id: Date.now() + 1, tier: 1 };
    setGrid(newGrid);
  }, []);

  const spawnItem = (index) => {
    if (grid[index] !== null) return;
    const newGrid = [...grid];
    newGrid[index] = { id: Date.now(), tier: 1 };
    setGrid(newGrid);
  };

  const mergeItem = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const fromItem = grid[fromIndex];
    const toItem = grid[toIndex];
    
    if (!fromItem) return;

    const newGrid = [...grid];

    if (!toItem) {
      // Move to empty
      newGrid[toIndex] = fromItem;
      newGrid[fromIndex] = null;
      setGrid(newGrid);
    } else if (fromItem.tier === toItem.tier && fromItem.tier < WIN_TIER) {
      // Merge!
      newGrid[toIndex] = { id: Date.now(), tier: fromItem.tier + 1 };
      newGrid[fromIndex] = null;
      setGrid(newGrid);

      if (fromItem.tier + 1 === WIN_TIER) {
        onComplete();
      }
    }
  };

  return { grid, spawnItem, mergeItem };
};

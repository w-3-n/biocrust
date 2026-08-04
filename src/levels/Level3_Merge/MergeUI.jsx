import React, { useState } from 'react';
import { useMergeGame } from './MergeLogic';
import { useGameManager } from '../../store/GameManager';

const TIER_INFO = {
  1: { name: '藓植株', emoji: '🌱', color: 'rgba(134, 239, 172, 0.8)' },
  2: { name: '藓群落', emoji: '🌿', color: 'rgba(74, 222, 128, 0.8)' },
  3: { name: '藓结皮', emoji: '🪨', color: 'rgba(22, 163, 74, 0.8)' },
  4: { name: '大棚', emoji: '🛖', color: 'rgba(59, 130, 246, 0.8)' },
  5: { name: '绿色山坡', emoji: '⛰️', color: 'rgba(16, 185, 129, 0.8)' }
};

export const MergeUI = () => {
  const { unlockKnowledge, advanceLevel } = useGameManager();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
    unlockKnowledge(3); // Artificial Inoculation
  };

  const { grid, spawnItem, mergeItem } = useMergeGame(handleComplete);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null) {
      mergeItem(draggedIndex, dropIndex);
      setDraggedIndex(null);
    }
  };

  const handleCellClick = (index) => {
    if (!grid[index]) {
      spawnItem(index);
    }
  };

  return (
    <div className="level-container">
      <div className="level-header">
        <h2>第三关：生物结皮大合成</h2>
        <p>点击空格子放置【藓植株】，拖拽相同的图标进行合成！<br/>目标：合成【绿色山坡】</p>
      </div>
      
      <div className="merge-grid">
        {grid.map((item, index) => (
          <div 
            key={index} 
            className="merge-cell"
            onClick={() => handleCellClick(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
          >
            {item && (
              <div 
                className="merge-item bounce-in"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                style={{ backgroundColor: TIER_INFO[item.tier].color }}
              >
                <span className="merge-emoji">{TIER_INFO[item.tier].emoji}</span>
                <span className="merge-name">{TIER_INFO[item.tier].name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isCompleted && (
        <div className="success-message fade-in">
          <h3>本关已完成，你得到了一块关于生物结皮的知识碎片~</h3>
          <p>人工接种与培养有望加速生物结皮的恢复。</p>
          <button className="btn-next" onClick={advanceLevel}>进入下一关</button>
        </div>
      )}
    </div>
  );
};

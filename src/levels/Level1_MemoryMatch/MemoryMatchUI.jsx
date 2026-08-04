import React from 'react';
import { useMemoryMatch } from './MemoryMatchLogic';
import { useGameManager } from '../../store/GameManager';

export const MemoryMatchUI = () => {
  const { unlockKnowledge, advanceLevel } = useGameManager();
  
  const handleComplete = () => {
    unlockKnowledge(1); // Unlocks Moss knowledge
    setTimeout(() => {
      // In a full game, we would advance to level 2.
      // For now, we will just show the success message.
      // advanceLevel();
    }, 4000);
  };

  const { cards, flippedIndices, matchedIndices, flipCard } = useMemoryMatch(handleComplete);

  return (
    <div className="level-container">
      <div className="level-header">
        <h2>第一关：藓类对对碰</h2>
        <p>记忆配对，找出8对蓝细菌照片！</p>
      </div>
      
      <div className="memory-grid">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
          const isMatched = matchedIndices.includes(index);
          
          return (
            <div 
              key={card.id} 
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
              onClick={() => flipCard(index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  ?
                </div>
                <div className="card-back">
                  菌 {card.type + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {matchedIndices.length === 16 && (
        <div className="success-message fade-in">
          <h3>本关已完成，你得到了一块关于生物结皮的知识碎片~</h3>
          <p>藓类是生物结皮的优势种之一。</p>
          <button className="btn-next" onClick={advanceLevel}>进入下一关</button>
        </div>
      )}
    </div>
  );
};

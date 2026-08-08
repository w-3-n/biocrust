import React from 'react';
import { useMemoryMatch } from './MemoryMatchLogic';
import { useGameManager } from '../../store/GameManager';

export const MemoryMatchUI = () => {
  const { unlockKnowledge, advanceLevel } = useGameManager();
  
  const CRUST_TYPES = [
    { name: '微鞘藻', emoji: '🦠' },
    { name: '念珠藻', emoji: '🧬' },
    { name: '颤藻', emoji: '〰️' },
    { name: '席藻', emoji: '🧶' },
    { name: '真藓', emoji: '🌿' },
    { name: '地钱', emoji: '🍀' },
    { name: '石蕊', emoji: '🍄' },
    { name: '绿球藻', emoji: '🟢' }
  ];
  
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
        <h2>{matchedIndices.length === 16 ? '第1关：藓类对对碰' : '第1关'}</h2>
        <p>记忆配对，将2张相同照片进行消除！</p>
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
                <div className="card-back" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{CRUST_TYPES[card.type % 8].emoji}</span>
                  <span style={{ fontSize: '0.9rem', marginTop: '4px' }}>{CRUST_TYPES[card.type % 8].name}</span>
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

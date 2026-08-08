import React, { useState } from 'react';
import { useFarming } from './FarmingLogic';
import { useGameManager } from '../../store/GameManager';

export const FarmingUI = () => {
  const { unlockKnowledge, advanceLevel } = useGameManager();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = (finalScore) => {
    setIsCompleted(true);
    unlockKnowledge(4); // Terraforming knowledge
  };

  const { grid, waterCrust, restart, score } = useFarming(handleComplete);

  return (
    <div className="level-container">
      <div className="level-header">
        <h2>{isCompleted ? '第4关：行星农场' : '第4关'}</h2>
        <p>太空培育基地：当生物结皮出现时，快速点击它们进行“浇灌营养液”！<br/>不要让它们干死，全部16块结皮培育成功即可通关。</p>
        <div style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: '#4ade80' }}>当前积分: {score}</div>
      </div>
      
      <div className="farming-grid">
        {grid.map((item, index) => (
          <div 
            key={index} 
            className={`farming-cell ${item ? item.state : 'empty'}`}
            onClick={() => waterCrust(index)}
          >
            {item && (item.state === 'healthy' || item.state === 'yellow' || item.state === 'red') && (
              <div className="crust-alive pulse" style={{ position: 'relative' }}>
                🦠
                {item.penaltyId && (
                  <div key={item.penaltyId} className={`penalty-text ${item.penaltyColor}`}>
                    {item.penalty}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isCompleted && (
        <div className="success-message fade-in">
          <h3>全部关卡已完成，现在你得到了一把打开新的知识之门的钥匙~</h3>
          <p>大胆一点想象，将来生物结皮或许可用于改造行星生态呢。</p>
          <button className="btn-next" onClick={advanceLevel}>查看结局</button>
        </div>
      )}
      

    </div>
  );
};

import React, { useState } from 'react';
import { useFarming } from './FarmingLogic';
import { useGameManager } from '../../store/GameManager';

export const FarmingUI = () => {
  const { unlockKnowledge, advanceLevel } = useGameManager();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
    unlockKnowledge(4); // Terraforming knowledge
  };

  const { grid, waterCrust, restart, hasFailed } = useFarming(handleComplete);

  return (
    <div className="level-container">
      <div className="level-header">
        <h2>第四关：行星农场</h2>
        <p>太空培育基地：当生物结皮出现时，快速点击它们进行“浇注营养液”！<br/>不要让它们干死，培育满整个区域即可通关。</p>
      </div>
      
      <div className="farming-grid">
        {grid.map((item, index) => (
          <div 
            key={index} 
            className={`farming-cell ${item ? item.state : 'empty'}`}
            onClick={() => waterCrust(index)}
          >
            {item && (item.state === 'healthy' || item.state === 'thirsty') && <div className="crust-alive pulse">🦠</div>}
            {item && item.state === 'dead' && <div className="crust-dead">枯萎</div>}
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
      
      {hasFailed && !isCompleted && (
        <div className="fail-message fade-in">
          <h3>培育失败！</h3>
          <p>有生物结皮枯死了。根据LDD规则，如果漏掉一次营养液则培育失败。</p>
          <button className="btn-retry" onClick={restart}>重新开始</button>
        </div>
      )}
    </div>
  );
};

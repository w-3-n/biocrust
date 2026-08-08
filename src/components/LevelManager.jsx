import React from 'react';
import { useGameManager } from '../store/GameManager';
import { MemoryMatchUI } from '../levels/Level1_MemoryMatch/MemoryMatchUI';
import { JigsawUI } from '../levels/Level2_Jigsaw/JigsawUI';
import { MergeUI } from '../levels/Level3_Merge/MergeUI';
import { FarmingUI } from '../levels/Level4_Farming/FarmingUI';

export const LevelManager = () => {
  const { currentLevel, startTime, endTime } = useGameManager();

  const renderEndScreen = () => {
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    let stars = 1;
    if (timeTaken < 120) stars = 3;
    else if (timeTaken < 240) stars = 2;

    return (
      <div className="end-screen">
        <h2>🎉 全部关卡已完成！</h2>
        <div style={{ margin: '20px 0', fontSize: '2rem' }}>
          {'⭐'.repeat(stars)}
        </div>
        <p>通关总时长: {timeTaken} 秒</p>
        <p style={{ marginTop: '20px' }}>你得到了一把打开新的知识之门的钥匙~</p>
        <p>大胆一点想象，将来生物结皮或许可用于改造行星生态呢。</p>
      </div>
    );
  };

  return (
    <div className="level-manager">
      {currentLevel === 1 && <MemoryMatchUI />}
      {currentLevel === 2 && <JigsawUI />}
      {currentLevel === 3 && <MergeUI />}
      {currentLevel === 4 && <FarmingUI />}
      {currentLevel === 'end' && renderEndScreen()}
    </div>
  );
};

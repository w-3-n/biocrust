import React from 'react';
import { useGameManager } from '../store/GameManager';
import { MemoryMatchUI } from '../levels/Level1_MemoryMatch/MemoryMatchUI';
import { JigsawUI } from '../levels/Level2_Jigsaw/JigsawUI';
import { MergeUI } from '../levels/Level3_Merge/MergeUI';
import { FarmingUI } from '../levels/Level4_Farming/FarmingUI';

export const LevelManager = () => {
  const { currentLevel } = useGameManager();

  return (
    <div className="level-manager">
      {currentLevel === 1 && <MemoryMatchUI />}
      {currentLevel === 2 && <JigsawUI />}
      {currentLevel === 3 && <MergeUI />}
      {currentLevel === 4 && <FarmingUI />}
      {currentLevel === 'end' && (
        <div className="end-screen">
          <h2>🎉 全部关卡已完成！</h2>
          <p>现在你得到了一把打开新的知识之门的钥匙~</p>
          <p>大胆一点想象，将来生物结皮或许可用于改造行星生态呢。</p>
        </div>
      )}
    </div>
  );
};

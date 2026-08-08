import React from 'react';
import { useGameManager } from '../store/GameManager';

const knowledgeData = [
  {
    id: 1,
    title: '藓类',
    text: '生物土壤结皮（简称生物结皮）是土壤颗粒与蓝细菌（也称蓝藻）、藻类、地衣、苔藓等光合自养生物以及细菌、真菌、古菌等异养生物组成的陆地土壤表面的一层连续体，通常位于或紧邻土壤最上层几毫米范围内。'
  },
  {
    id: 2,
    title: '保护遗址',
    text: '生物结皮约占地球陆地面积的12%，特别是在干旱地区广泛分布。生物结皮有许多重要的生态功能，包括水土保持、固定碳氮、调节地表能量平衡、保护遗址等。'
  },
  {
    id: 3,
    title: '人工接种与培养',
    text: '生物结皮对地球生态系统有重要作用，但因气候变化与土地利用集约化，未来可能会减少25%~40%，导致水土流失等一系列问题，我们要尽快行动起来了！例如，适度放牧、设立保护区、人工接种与培养等，都有利于生物结皮的保护与恢复。'
  },
  {
    id: 4,
    title: '改造行星生态',
    text: '生物结皮的未来是什么样的？在地球上，生物结皮生态功能的恢复，也许可促进生态环境健康；在月球、火星等其它行星上，具有极强耐性、自养特征、成土作用等特征的生物结皮，也许可以用于改造行星生态！'
  }
];

export const KnowledgePanel = () => {
  const { unlockedKnowledge } = useGameManager();

  return (
    <div className="knowledge-panel">
      <h2>知识碎片 (Knowledge Fragments)</h2>
      <div className="knowledge-list">
        {knowledgeData.map((item) => {
          const isUnlocked = unlockedKnowledge.includes(item.id);
          return (
            <div key={item.id} className={`knowledge-item ${isUnlocked ? 'unlocked' : 'locked'}`}>
              <h3>{isUnlocked ? item.title : '***'}</h3>
              <p>{isUnlocked ? item.text : '【未解锁】通过关卡获取知识'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

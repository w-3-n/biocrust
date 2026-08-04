import React from 'react';
import { GameProvider } from './store/GameManager';
import { KnowledgePanel } from './components/KnowledgePanel';
import { LevelManager } from './components/LevelManager';
import './index.css';

function App() {
  return (
    <GameProvider>
      <div className="game-app">
        <header className="game-header">
          <h1>Biocrust 探索者</h1>
        </header>
        <div className="game-layout">
          <LevelManager />
          <KnowledgePanel />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;

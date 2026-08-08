import React, { useState } from 'react';
import { useJigsaw } from './JigsawLogic';
import { useGameManager } from '../../store/GameManager';

const IMAGE_URL = '/greatwall_puzzle.jpg';

export const JigsawUI = () => {
  const { unlockKnowledge, advanceLevel } = useGameManager();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
    unlockKnowledge(2); // Unlocks Site Protection knowledge
  };

  const { tray, board, movePieceToBoard, movePieceToTray } = useJigsaw(handleComplete);
  const [draggedPiece, setDraggedPiece] = useState(null);

  const handleDragStart = (e, pieceId) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.setData('text/plain', pieceId);
  };

  const handleDropOnBoard = (e, slotIndex) => {
    e.preventDefault();
    if (draggedPiece !== null) {
      movePieceToBoard(draggedPiece, slotIndex);
      setDraggedPiece(null);
    }
  };

  const handleDropOnTray = (e) => {
    e.preventDefault();
    if (draggedPiece !== null) {
      movePieceToTray(draggedPiece);
      setDraggedPiece(null);
    }
  };

  const renderPiece = (piece) => {
    if (!piece) return null;
    const row = Math.floor(piece.id / 4);
    const col = piece.id % 4;
    return (
      <div
        className="jigsaw-piece"
        draggable
        onDragStart={(e) => handleDragStart(e, piece.id)}
        style={{
          backgroundImage: `url(${IMAGE_URL})`,
          backgroundPosition: `-${col * 100}px -${row * 100}px`
        }}
      >
        <span className="piece-hint">{piece.id + 1}</span>
      </div>
    );
  };

  return (
    <div className="level-container">
      <div className="level-header">
        <h2>{isCompleted ? '第2关：长城修理工' : '第2关'}</h2>
        <p>拖拽碎片，还原完整的照片！</p>
      </div>
      
      <div className="jigsaw-game-area">
        <div 
          className="jigsaw-board"
          onDragOver={(e) => e.preventDefault()}
        >
          {board.map((piece, index) => (
            <div 
              key={`slot-${index}`} 
              className="jigsaw-slot"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOnBoard(e, index)}
            >
              {renderPiece(piece)}
            </div>
          ))}
        </div>

        <div 
          className="jigsaw-tray"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnTray}
        >
          {tray.map(piece => (
            <div key={`tray-${piece.id}`} className="tray-item">
              {renderPiece(piece)}
            </div>
          ))}
        </div>
      </div>
      
      {isCompleted && (
        <div className="success-message fade-in">
          <h3>本关已完成，你得到了一块关于生物结皮的知识碎片~</h3>
          <p>保护遗址是生物结皮的生态功能之一。</p>
          <button className="btn-next" onClick={advanceLevel}>进入下一关</button>
        </div>
      )}
    </div>
  );
};

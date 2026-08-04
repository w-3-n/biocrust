import { useState, useEffect } from 'react';

const PIECE_COUNT = 16;

export const useJigsaw = (onComplete) => {
  // tray holds the pieces waiting to be placed
  const [tray, setTray] = useState([]);
  // board holds pieces placed on the 4x4 grid (null if empty)
  const [board, setBoard] = useState(Array(PIECE_COUNT).fill(null));
  
  useEffect(() => {
    // Initialize pieces 0-15 and shuffle them into the tray
    const pieces = Array.from({ length: PIECE_COUNT }, (_, i) => ({ id: i }));
    pieces.sort(() => Math.random() - 0.5);
    setTray(pieces);
  }, []);

  const movePieceToBoard = (pieceId, slotIndex) => {
    // Find the piece in the tray or on the board
    let newTray = [...tray];
    let newBoard = [...board];
    
    // Remove from tray if it was there
    newTray = newTray.filter(p => p.id !== pieceId);
    
    // Remove from previous board slot if it was there
    const prevSlotIndex = newBoard.findIndex(p => p && p.id === pieceId);
    if (prevSlotIndex !== -1) {
      newBoard[prevSlotIndex] = null;
    }

    // If there's already a piece in the target slot, put it back in the tray
    if (newBoard[slotIndex] !== null) {
      newTray.push(newBoard[slotIndex]);
    }

    // Place the piece in the new slot
    newBoard[slotIndex] = { id: pieceId };

    setTray(newTray);
    setBoard(newBoard);
    
    checkCompletion(newBoard);
  };

  const movePieceToTray = (pieceId) => {
    let newTray = [...tray];
    let newBoard = [...board];
    
    const prevSlotIndex = newBoard.findIndex(p => p && p.id === pieceId);
    if (prevSlotIndex !== -1) {
      newBoard[prevSlotIndex] = null;
      newTray.push({ id: pieceId });
    }
    
    setTray(newTray);
    setBoard(newBoard);
  };

  const checkCompletion = (currentBoard) => {
    // Check if every slot is filled with the correct piece (id === index)
    const isComplete = currentBoard.every((piece, index) => piece && piece.id == index);
    if (isComplete) {
      onComplete();
    }
  };

  return { tray, board, movePieceToBoard, movePieceToTray };
};

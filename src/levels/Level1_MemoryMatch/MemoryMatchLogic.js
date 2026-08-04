import { useState, useEffect } from 'react';

const CARDS_COUNT = 16;

export const useMemoryMatch = (onComplete) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // 8 pairs of cards
    const initialCards = [];
    for (let i = 0; i < CARDS_COUNT / 2; i++) {
      initialCards.push({ id: i * 2, type: i });
      initialCards.push({ id: i * 2 + 1, type: i });
    }
    // Shuffle
    initialCards.sort(() => Math.random() - 0.5);
    setCards(initialCards);
  }, []);

  const flipCard = (index) => {
    if (isLocked || flippedIndices.includes(index) || matchedIndices.includes(index)) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].type === cards[secondIndex].type) {
        setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && matchedIndices.length === cards.length) {
      onComplete();
    }
  }, [matchedIndices, cards, onComplete]);

  return { cards, flippedIndices, matchedIndices, flipCard };
};

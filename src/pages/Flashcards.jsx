import React, { useState } from 'react';
import { Layers, ChevronLeft, ChevronRight, RotateCw, CheckCircle, XCircle } from 'lucide-react';
import { flashcards } from '../data/practiceData';
import './Flashcards.css';

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState(new Set());

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const markKnown = (isKnown) => {
    const newKnown = new Set(knownCards);
    if (isKnown) {
      newKnown.add(currentCard.id);
    } else {
      newKnown.delete(currentCard.id);
    }
    setKnownCards(newKnown);
    handleNext();
  };

  const progress = Math.round((knownCards.size / flashcards.length) * 100);

  return (
    <div className="flashcards-page fade-in">
      <div className="page-header">
        <h1>Flashcards</h1>
        <p>Master concepts with active recall.</p>
      </div>

      <div className="flashcards-container">
        <div className="flashcard-controls-top">
          <span className="deck-info"><Layers size={18} /> Default Deck ({flashcards.length} cards)</span>
          <div className="progress-info">
            <span>{progress}% Mastered</span>
            <div className="progress-bar-bg" style={{ width: '100px', height: '6px' }}>
              <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: 'var(--success)' }}></div>
            </div>
          </div>
        </div>

        <div className="flashcard-wrapper">
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <span className="card-category">{currentCard.category}</span>
                <h2>{currentCard.question}</h2>
                <div className="flip-hint"><RotateCw size={16} /> Click to flip</div>
              </div>
              <div className="flashcard-back">
                <span className="card-category">{currentCard.category}</span>
                <p>{currentCard.answer}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flashcard-actions">
          <button className="nav-btn" onClick={handlePrev}><ChevronLeft size={24} /></button>
          
          <div className="eval-actions">
            <button className="eval-btn again" onClick={() => markKnown(false)}>
              <XCircle size={20} /> Review Again
            </button>
            <button className="eval-btn got-it" onClick={() => markKnown(true)}>
              <CheckCircle size={20} /> Got It
            </button>
          </div>

          <button className="nav-btn" onClick={handleNext}><ChevronRight size={24} /></button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;

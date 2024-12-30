import React, { useState, useEffect } from 'react';
import './highScoreTable.css';

const STORAGE_KEY_PREFIX = 'highScores';
const MAX_HIGH_SCORES = 10;

const ScoreEntry = ({ score, onFinish, onNotWorthy, gameType, gameMode, region }) => {
  const [selectedChar, setSelectedChar] = useState(0);
  const [playerName, setPlayerName] = useState(['A', 'A', 'A']);
  const [blink, setBlink] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const storageKey = `${STORAGE_KEY_PREFIX}_${gameType}_${gameMode}_${region}`;
  const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const isScoreWorthy = (score) => {
    const savedScores = localStorage.getItem(storageKey);
    const currentScores = savedScores ? JSON.parse(savedScores) : [];
    if (currentScores.length < MAX_HIGH_SCORES) return true;
    return score > (currentScores[MAX_HIGH_SCORES - 1]?.score || 0);
  };

  const saveScore = () => {
    const savedScores = localStorage.getItem(storageKey);
    const currentScores = savedScores ? JSON.parse(savedScores) : [];
    
    const newScore = {
      name: playerName.join(''),
      score,
      date: new Date().toISOString(),
      region: region
    };

    const updatedScores = [...currentScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGH_SCORES);

    localStorage.setItem(storageKey, JSON.stringify(updatedScores));
    
    if (onFinish) {
      onFinish();
    }
  };

  useEffect(() => {
    if (!isScoreWorthy(score)) {
      onNotWorthy?.();
      return;
    }

    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [score, onNotWorthy]);

  useEffect(() => {
    if (isComplete) {
      saveScore();
    }
  }, [isComplete]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowDown': {
          setPlayerName(prev => {
            const newName = [...prev];
            const currentCharIndex = availableChars.indexOf(newName[selectedChar]);
            const nextCharIndex = (currentCharIndex + 1) % availableChars.length;
            newName[selectedChar] = availableChars[nextCharIndex];
            return newName;
          });
          break;
        }
        case 'ArrowUp': {
          setPlayerName(prev => {
            const newName = [...prev];
            const currentCharIndex = availableChars.indexOf(newName[selectedChar]);
            const nextCharIndex = currentCharIndex - 1 < 0 
              ? availableChars.length - 1 
              : currentCharIndex - 1;
            newName[selectedChar] = availableChars[nextCharIndex];
            return newName;
          });
          break;
        }
        case 'ArrowRight':
          if (selectedChar < 2) {
            setSelectedChar(prev => prev + 1);
          }
          break;
        case 'ArrowLeft':
          if (selectedChar > 0) {
            setSelectedChar(prev => prev - 1);
          }
          break;
        case 'Enter':
          if (selectedChar === 2) {
            setIsComplete(true);
          } else {
            setSelectedChar(prev => Math.min(prev + 1, 2));
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedChar]);

  return (
    <div className="high-score-container">
      <h1 className="title">NEW HIGH SCORE!</h1>

      <div className="current-score">
        YOUR SCORE {String(score).padStart(5, '0')}
      </div>

      <div className="name-entry-container">
        <div className="name-entry-title">
          ENTER YOUR NAME
        </div>
        <div className="name-entry-grid">
          {playerName.map((char, index) => (
            <div
              key={index}
              className={`character-box ${
                index === selectedChar
                  ? blink ? 'character-box--selected' : 'character-box--hidden'
                  : 'character-box--normal'
              }`}
            >
              {char}
            </div>
          ))}
        </div>
        <div className="instructions">
          Use ← → to move, ↑ ↓ to change letter, ENTER to confirm
        </div>
      </div>
    </div>
  );
};

export default ScoreEntry;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './scoreEntry.css';

const STORAGE_KEY_PREFIX = 'highScores';
const MAX_HIGH_SCORES = 10;

const ScoreEntry = ({ score, gameType, gameMode, region }) => {
  const navigate = useNavigate();
  const [selectedChar, setSelectedChar] = useState(0);
  const [playerName, setPlayerName] = useState(['A', 'A', 'A']);
  const [blink, setBlink] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  if (!region) {
    console.error('No region provided to ScoreEntry');
  }

  const storageKey = `${STORAGE_KEY_PREFIX}_${gameType}_${gameMode}_${region}`;
  const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const isScoreWorthy = (score) => {
    try {
      const savedScores = localStorage.getItem(storageKey);
      const currentScores = savedScores ? JSON.parse(savedScores) : [];
      if (currentScores.length < MAX_HIGH_SCORES) return true;
      return score > (currentScores[MAX_HIGH_SCORES - 1]?.score || 0);
    } catch (error) {
      console.error('Error checking score worthiness:', error);
      return true;
    }
  };

  const saveScore = () => {
    try {
      const savedScores = localStorage.getItem(storageKey);
      const currentScores = savedScores ? JSON.parse(savedScores) : [];

      const newScore = {
        name: playerName.join(''),
        score,
        date: new Date().toISOString(),
        region
      };

      const updatedScores = [...currentScores, newScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_HIGH_SCORES);

      localStorage.setItem(storageKey, JSON.stringify(updatedScores));

      navigate(`/scoreboard?gameMode=${gameMode}&region=${region}`);
    } catch (error) {
      console.error('Error saving score:', error);
      navigate('/scoreboard');
    }
  };

  useEffect(() => {
    if (!isScoreWorthy(score)) {
      navigate('/scoreboard');
      return;
    }

    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [score]);

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
    <>
      <div className="score-entry-backdrop" />
      <div className="score-entry-container">
        <h1 className="score-entry-title">NEW HIGH SCORE!</h1>

        <div className="score-entry-score">
          YOUR SCORE {score}
        </div>

        <div className="name-entry-container">
          <div className="name-entry-title">
            ENTER YOUR NAME
          </div>
          <div className="name-entry-grid">
            {playerName.map((char, index) => (
              <div
                key={index}
                className={`character-box ${index === selectedChar
                    ? blink ? 'character-box--selected' : 'character-box--hidden'
                    : 'character-box--normal'
                  }`}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="score-entry-instructions">
            Use ← → to move, ↑ ↓ to change letter, ENTER to confirm
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreEntry;
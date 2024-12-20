import React, { useState, useEffect } from 'react';
import './highScoreTable.css';

const MAX_HIGH_SCORES = 10;
const STORAGE_KEY = 'highScores';

const HighScoreTable = ({ currentScore = 0 }) => {
  const [isEnteringName, setIsEnteringName] = useState(true);
  const [selectedChar, setSelectedChar] = useState(0);
  const [playerName, setPlayerName] = useState(['A', 'A', 'A']);
  const [blink, setBlink] = useState(true);
  const [highScores, sethighScores] = useState([]);

  const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const ranks = ['1ST', '2ND', '3RD', '4TH', '5TH' , '6TH', '7TH', '8TH', '9TH', '10TH'];

  // Cargar puntuaciones al iniciar
  useEffect(() => {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    if (savedScores) {
      sethighScores(JSON.parse(savedScores));
    }
  }, []);

  // Efecto para el parpadeo
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const saveScore = (name, score) => {
    const newScore = {
      name,
      score,
      date: new Date().toISOString()
    };

    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_HIGH_SCORES);

    setHighScores(updatedScores);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isEnteringName) return;

      switch (e.key) {
        case 'ArrowUp':
          setPlayerName(prev => {
            const newName = [...prev];
            const currentCharIndex = availableChars.indexOf(newName[selectedChar]);
            const nextCharIndex = (currentCharIndex + 1) % availableChars.length;
            newName[selectedChar] = availableChars[nextCharIndex];
            return newName;
          });
          break;
        case 'ArrowDown':
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
        case 'ArrowRight':
          setSelectedChar(prev => (prev + 1) % 3);
          break;
        case 'ArrowLeft':
          setSelectedChar(prev => prev - 1 < 0 ? 2 : prev - 1);
          break;
        case 'Enter':
          if (selectedChar === 2) {
            setIsEnteringName(false);
            saveScore(playerName.join(''), currentScore);
          } else {
            setSelectedChar(prev => (prev + 1) % 3);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedChar, isEnteringName, currentScore]);

  return (
    <div className="high-score-container">
      <h1 className="title">HALL OF FAME</h1>

      <div className="current-score">
        YOUR SCORE {String(currentScore).padStart(5, '0')}
      </div>

      {isEnteringName ? (
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
      ) : (
        <>
          <div className="table-header">
            <div>RANK</div>
            <div>SCORE</div>
            <div>NAME</div>
          </div>

          <div className="space-y-2">
            {ranks.map((rank, index) => {
              const score = highScores[index] || { score: '---', name: '---' };
              return (
                <div key={rank} className="score-row">
                  <div className={`rank-${rank.toLowerCase()}`}>
                    {rank}
                  </div>
                  <div className={`rank-${rank.toLowerCase()}`}>
                    {typeof score.score === 'number' 
                      ? String(score.score).padStart(3, '0') 
                      : score.score}
                  </div>
                  <div className={`rank-${rank.toLowerCase()}`}>
                    {score.name}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="buttons-container">
        <button className="try-again-button">
          TRY AGAIN
        </button>
        <button className="exit-button">
          Exit to Menu
        </button>
      </div>
    </div>
  );
};

export default HighScoreTable;
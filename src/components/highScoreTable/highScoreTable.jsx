import React, { useState, useEffect } from 'react';
import './highScoreTable.css';

const STORAGE_KEY = 'highScores';
const MAX_HIGH_SCORES = 10;
const RANKS = [
  '1ST', '2ND', '3RD', '4TH', '5TH', 
  '6TH', '7TH', '8TH', '9TH', '10TH'
];

const ScoreBoard = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  return (
    <div className="high-score-container">
      <h1 className="title">HALL OF FAME</h1>

      <div className="table-header">
        <div>RANK</div>
        <div>SCORE</div>
        <div>NAME</div>
      </div>

      <div className="space-y-2">
        {RANKS.map((rank, index) => {
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

      <div className="buttons-container">
        <button className="exit-button">
          Exit to Menu
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;
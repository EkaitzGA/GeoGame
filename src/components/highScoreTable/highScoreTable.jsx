import React, { useState, useEffect } from 'react';
import './highScoreTable.css';

const STORAGE_KEY_PREFIX = 'highScores';
const MAX_HIGH_SCORES = 10;
const RANKS = [
  '1ST', '2ND', '3RD', '4TH', '5TH',
  '6TH', '7TH', '8TH', '9TH', '10TH'
];
const REGIONS = ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const ScoreBoard = () => {
  const [currentMode, setCurrentMode] = useState('blitz');
  const [currentRegion, setCurrentRegion] = useState('All');
  const [flagsScores, setFlagsScores] = useState([]);
  const [capitalsScores, setCapitalsScores] = useState([]);

  useEffect(() => {
    const flagsKey = `${STORAGE_KEY_PREFIX}_flags_${currentMode}_${currentRegion}`;
    const capitalsKey = `${STORAGE_KEY_PREFIX}_capitals_${currentMode}_${currentRegion}`;
    
    const savedFlagsScores = localStorage.getItem(flagsKey);
    const savedCapitalsScores = localStorage.getItem(capitalsKey);
    
    setFlagsScores(savedFlagsScores ? JSON.parse(savedFlagsScores) : []);
    setCapitalsScores(savedCapitalsScores ? JSON.parse(savedCapitalsScores) : []);
  }, [currentMode, currentRegion]);

  const ScoreTable = ({ title, scores }) => (
    <div className="scoreboard-page">
      <div className="high-score-container">
        <h1 className="title">{title} - HALL OF FAME</h1>
        <div className="table-header">
          <div>RANK</div>
          <div>SCORE</div>
          <div>NAME</div>
        </div>
        <div className="space-y-2">
          {RANKS.map((rank, index) => {
            const score = scores[index] || { score: '---', name: '---' };
            return (
              <div key={rank} className="score-row">
                <div className={`rank-${rank.toLowerCase()}`}>{rank}</div>
                <div className={`rank-${rank.toLowerCase()}`}>
                  {typeof score.score === 'number' 
                    ? String(score.score).padStart(3, '0') 
                    : score.score}
                </div>
                <div className={`rank-${rank.toLowerCase()}`}>{score.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="scoreboards-container">
      <div className="controls-container">
        <div className="game-mode-selector">
          <button 
            className={`mode-button ${currentMode === 'blitz' ? 'active' : ''}`}
            onClick={() => setCurrentMode('blitz')}
          >
            Blitz Mode
          </button>
          <button 
            className={`mode-button ${currentMode === 'relax' ? 'active' : ''}`}
            onClick={() => setCurrentMode('relax')}
          >
            Relax Mode
          </button>
        </div>
        
        <div className="region-selector">
          {REGIONS.map(region => (
            <button
              key={region}
              className={`region-button ${currentRegion === region ? 'active' : ''}`}
              onClick={() => setCurrentRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="tables-container">
        <ScoreTable title="FLAGS" scores={flagsScores} />
        <ScoreTable title="CAPITALS" scores={capitalsScores} />
      </div>
    </div>
  );
};

export default ScoreBoard;
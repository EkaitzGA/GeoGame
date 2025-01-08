import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../button/button';
import './highScoreTable.css';

const STORAGE_KEY_PREFIX = 'highScores';
const RANKS = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH', '7TH', '8TH', '9TH', '10TH'];
const REGIONS = ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const ScoreTable = ({ title, scores }) => (
  <div className="high-score-container">
    <h1 className="title">{title}<br />HALL OF FAME</h1>
    <div className="table-header">
      <div>RANK</div>
      <div>SCORE</div>
      <div>NAME</div>
    </div>
    <div>
      {RANKS.map((rank, index) => {
        const score = scores[index] || { score: '---', name: '---' };
        return (
          <div key={rank} className={`score-row rank-${rank.toLowerCase()}`}>
            <div>{rank}</div>
            <div>{score.score}</div>
            <div>{score.name}</div>
          </div>
        );
      })}
    </div>
  </div>
);

const ScoreBoard = () => {
  const [searchParams] = useSearchParams();
  const initialGameMode = searchParams.get('gameMode') || 'blitz';
  const initialRegion = searchParams.get('region') || 'World';
  
  const [currentMode, setCurrentMode] = useState(initialGameMode);
  const [currentRegion, setCurrentRegion] = useState(initialRegion);
  const [flagsScores, setFlagsScores] = useState([]);
  const [capitalsScores, setCapitalsScores] = useState([]);

  useEffect(() => {
    const flagsKey = `${STORAGE_KEY_PREFIX}_flags_${currentMode}_${currentRegion}`;
    const capitalsKey = `${STORAGE_KEY_PREFIX}_capitals_${currentMode}_${currentRegion}`;

    try {
      const savedFlagsScores = localStorage.getItem(flagsKey);
      const savedCapitalsScores = localStorage.getItem(capitalsKey);

      setFlagsScores(savedFlagsScores ? JSON.parse(savedFlagsScores) : []);
      setCapitalsScores(savedCapitalsScores ? JSON.parse(savedCapitalsScores) : []);
    } catch (error) {
      console.error('Error loading scores:', error);
      setFlagsScores([]);
      setCapitalsScores([]);
    }
  }, [currentMode, currentRegion]);

  return (
    <div className="scoreboards-wrapper">
      <div className="scoreboards-header">
        <div className="scoreboard-controls">
          <div className="scoreboard-mode-selector">
            <Button
              onClick={() => setCurrentMode('blitz')}
              isSelectable={true}
              isSelected={currentMode === 'blitz'}
            >
              Blitz Mode
            </Button>
            <Button
              onClick={() => setCurrentMode('relax')}
              isSelectable={true}
              isSelected={currentMode === 'relax'}
            >
              Relax Mode
            </Button>
          </div>

          <div className="scoreboard-region-selector">
            {REGIONS.map(region => (
              <Button
                key={region}
                onClick={() => setCurrentRegion(region)}
                isSelectable={true}
                isSelected={currentRegion === region}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="scoreboards-content">
        <ScoreTable title="FLAGS" scores={flagsScores} />
        <ScoreTable title="CAPITALS" scores={capitalsScores} />
      </div>
    </div>
  );
};

export default ScoreBoard;
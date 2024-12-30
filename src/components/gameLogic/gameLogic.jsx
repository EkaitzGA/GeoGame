import React, { useState, useEffect, useRef } from 'react';
import ScoreEntry from '../highScoreTable/scoreEntry';
import './gameLogic.css';

const MAX_QUESTIONS = 20;

const GameLogic = ({ countries, gameMode, renderQuestion, renderOptions, onGameEnd, gameType, region}) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameMode === 'blitz' ? 5 : null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [usedCountries, setUsedCountries] = useState(new Set());
  const [canAnswer, setCanAnswer] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Usar una ref para evitar múltiples actualizaciones
  const isProcessingAnswer = useRef(false);

  const generateQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS) {
      setIsGameOver(true);
      return;
    }

    const availableCountries = countries.filter(c => !usedCountries.has(c.name.common));
    if (availableCountries.length < 4) {
      setIsGameOver(true);
      return;
    }

    const correctIndex = Math.floor(Math.random() * availableCountries.length);
    const correctCountry = availableCountries[correctIndex];

    const wrongOptions = availableCountries
      .filter(c => c.name.common !== correctCountry.name.common)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongOptions, correctCountry]
      .sort(() => Math.random() - 0.5);

    setCurrentQuestion(correctCountry);
    setOptions(allOptions);
    setUsedCountries(prev => new Set([...prev, correctCountry.name.common]));
    setTimeLeft(gameMode === 'blitz' ? 5 : null);
    setCanAnswer(true);
    setSelectedCountry(null);
    setIsLoading(false);
    isProcessingAnswer.current = false;
  };

  const processAnswer = (selected) => {
    if (!canAnswer || isProcessingAnswer.current) return;
    
    isProcessingAnswer.current = true;
    setCanAnswer(false);
    setSelectedCountry(selected);

    if (selected.name.common === currentQuestion.name.common) {
      setScore(prev => prev + 100);
    }

    setTimeout(() => {
      setQuestionNumber(prev => prev + 1);
      generateQuestion();
    }, 2000);
  };

  const handleTimeOut = () => {
    if (isProcessingAnswer.current) return;
    
    const wrongAnswer = options.find(option => 
      option.name.common !== currentQuestion.name.common
    );
    if (wrongAnswer) {
      processAnswer(wrongAnswer);
    }
  };

  useEffect(() => {
    if (countries && countries.length > 0) {
      generateQuestion();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (gameMode === 'blitz' && timeLeft !== null && canAnswer) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeOut();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameMode, canAnswer, timeLeft]);

  if (isGameOver) {
    return (
      <ScoreEntry 
        score={score} 
        onFinish={() => onGameEnd(score)} 
        gameType={gameType} 
        gameMode={gameMode} 
        region={region}
      />
    );
  }

  if (isLoading || !currentQuestion) {
    return <div className="loading">Cargando pregunta...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="header-info">
          <div className="score">Score: {score}</div>
          <div className="questions">Question: {questionNumber}/{MAX_QUESTIONS}</div>
        </div>
        {gameMode === 'blitz' && (
          <div className={`timer ${timeLeft <= 3 ? 'danger' : ''}`}>
            Time: {timeLeft}s
          </div>
        )}
      </div>

      <div className="question-container">
        {renderQuestion(currentQuestion)}
      </div>

      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option.name.common}
            onClick={() => processAnswer(option)}
            disabled={!canAnswer}
            className={`option-button ${
              !canAnswer && selectedCountry?.name.common === option.name.common
                ? (option.name.common === currentQuestion.name.common ? 'correct' : 'incorrect')
                : ''
            }`}
          >
            {renderOptions(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameLogic;
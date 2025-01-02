import React, { useState } from 'react';
import GamePage from "../gamePage/gamePage";
import GameLogic from '../gameLogic/gameLogic';
import { useLocation } from 'react-router-dom';
import './flagPage.css';

const FlagPage = () => {
    const location = useLocation();
    const [gameState, setGameState] = useState({
        isPlaying: false,
        countries: [],
        gameMode: null,
        region: null
    });

    const handleStartGame = ({ countries, gameMode, region }) => {
        setGameState({
            isPlaying: true,
            countries,
            gameMode,
            region
        });
    };

    const handleGameEnd = (finalScore) => {
        setGameState(prev => ({
            ...prev,
            isPlaying: false
        }));
    };

    if (gameState.isPlaying) {
        return (
            <div className="flag-game-container">
                <GameLogic
                    countries={gameState.countries}
                    gameMode={gameState.gameMode}
                    gameType="flags"
                    region={gameState.region}
                    renderQuestion={(country) => (
                        <div className="flag-question-text">
                            Select the flag of {country.name.common}
                        </div>
                    )}
                    renderOptions={(country) => (
                        <img
                            src={country.flags.svg}
                            alt={`Flag of ${country.name.common}`}
                            className="flag-image"
                        />
                    )}
                    optionsContainerClassName="flag-options-grid"
                    optionItemClassName="flag-option-item"
                    onGameEnd={handleGameEnd}
                />
            </div>
        );
    }

    return (
        <GamePage
            key={location.key}
            title="Flags"
            onStartGame={handleStartGame}
            gameType="flags"
        />
    );
};

export default FlagPage;
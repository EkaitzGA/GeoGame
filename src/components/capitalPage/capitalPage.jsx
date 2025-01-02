import React, { useState } from 'react';
import GamePage from "../gamePage/gamePage";
import GameLogic from '../gameLogic/gameLogic';
import Button from '../button/button';
import { useLocation } from 'react-router-dom';


const CapitalPage = () => {
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
            <div className="capital-game-container">
                <GameLogic
                    countries={gameState.countries}
                    gameMode={gameState.gameMode}
                    gameType="capitals"
                    region={gameState.region}
                    renderQuestion={(country) => (
                        <div className="capital-question-text">
                            Select the capital of {country.name.common}
                        </div>
                    )}
                    renderOptions={(country) => (
                        <div className="capital-text">
                            {country.capital?.[0] || 'No capital'}
                        </div>
                    )}
                    optionsContainerClassName="capital-options-grid"
                    optionItemClassName="option-button"
                    onGameEnd={handleGameEnd}
                />
            </div>
        );
    }

    return (
        <div className="controls-container">
            <GamePage
                key={location.key}
                title="Capitals"
                onStartGame={handleStartGame}
                gameType="capitals"
                ButtonComponent={Button}
            />
        </div>
    );
};

export default CapitalPage;
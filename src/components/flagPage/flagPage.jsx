import React, { useState } from 'react';
import GamePage from "../gamePage/gamePage";
import GameLogic from '../gameLogic/gameLogic';
import Button from '../button/button';
import { useLocation } from 'react-router-dom';


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
                title="Flags"
                onStartGame={handleStartGame}
                gameType="flags"
                ButtonComponent={Button}
            />
        </div>
    );
};

export default FlagPage;
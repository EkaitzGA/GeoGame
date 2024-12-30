import React, { useState } from 'react';
import GamePage from "../gamePage/gamePage";
import GameLogic from '../gameLogic/gameLogic';

const FlagPage = () => {
    const [gameState, setGameState] = useState({
        isPlaying: false,
        countries: [],
        gameMode: null
    });

    const handleStartGame = ({ countries, gameMode }) => {
        setGameState({
            isPlaying: true,
            countries,
            gameMode
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
            <GameLogic
                countries={gameState.countries}
                gameMode={gameState.gameMode}
                gameType="flags"
                renderQuestion={(country) => (
                    <div className="question-text">
                        Select the flag of {country.name.common}
                    </div>
                )}
                renderOptions={(country) => (
                    <img 
                        src={country.flags.svg} 
                        alt={`Bandera de ${country.name.common}`}
                        className="flag-image"
                    />
                )}
                onGameEnd={handleGameEnd}
            />
        );
    }

    return (
        <GamePage
            title="Flags"
            onStartGame={handleStartGame}
            gameType="flags"
        />
    );
};

export default FlagPage;
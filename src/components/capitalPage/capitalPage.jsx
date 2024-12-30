import React, { useState } from 'react';
import GamePage from "../gamePage/gamePage";
import GameLogic from '../gameLogic/gameLogic'


const CapitalPage = () => {
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
                gameType="capitals"                renderQuestion={(country) => (
                    <div className="question-text">
                        Select the capital of  {country.name.common}
                    </div>
                )}
                renderOptions={(country) => (
                    <div className="capital-text">
                        {country.capital?.[0] || 'No tiene capital'}
                    </div>
                )}
                onGameEnd={handleGameEnd}
            />
        );
    }

    return (
        <GamePage
            title="Capitals"
            onStartGame={handleStartGame}
            gameType="capitals"
        />
    );
};

export default CapitalPage;
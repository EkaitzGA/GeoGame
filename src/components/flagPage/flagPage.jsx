import React from 'react';
import GamePage from "../gamePage/gamePage";

const FlagPage = () => {
    const handleStartGame = ({ countries, gameMode, regions }) => {
      // Lógica específica del juego de banderas
      console.log('Iniciando juego de banderas:', {
        numCountries: countries.length,
        mode: gameMode,
        regions: regions
      });
    };
  
    return (
      <GamePage 
        title="Juego de Banderas" 
        onStartGame={handleStartGame}
      >
        {/* Aquí puedes añadir elementos específicos del juego de banderas */}
      </GamePage>
    );
  };
  
  export default FlagPage;


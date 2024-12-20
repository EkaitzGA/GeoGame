import React from 'react';
import GamePage from "../gamePage/gamePage";

const CapitalPage = () => {
    const handleStartGame = ({ countries, gameMode, regions }) => {
      // Lógica específica del juego de capitales
      console.log('Iniciando juego de capitales:', {
        numCountries: countries.length,
        mode: gameMode,
        regions: regions
      });
    };
  
    return (
      <GamePage 
        title="Juego de Capitales" 
        onStartGame={handleStartGame}
      >
        {/* Aquí puedes añadir elementos específicos del juego de capitales */}
      </GamePage>
    );
  };
  
  export default CapitalPage;
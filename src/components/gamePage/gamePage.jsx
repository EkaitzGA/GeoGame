import React, { useState, useEffect } from 'react';
import { fetchAllCountries } from '../../utils/apiCall';
import Button from '../button/button';
import './gamePage.css';

const GamePage = ({
  title,
  onStartGame,
  gameType,
  children
}) => {
  const [selectedRegion, setSelectedRegion] = useState('World');
  const [selectedGameMode, setSelectedGameMode] = useState('relax');
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        if (data) {
          setCountries(data);
          setFilteredCountries(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading countries:', error);
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (countries && countries.length > 0) {
      if (selectedRegion === 'World') {
        setFilteredCountries(countries);
        console.log('Mostrando todos los países:', countries.length);
      } else {
        const filtered = countries.filter(country =>
          country.region === selectedRegion
        );
        setFilteredCountries(filtered);
        console.log(`Países filtrados de ${selectedRegion}:`, filtered.length);
      }
    }
  }, [selectedRegion, countries]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const handleGameModeSelect = (mode) => {
    setSelectedGameMode(mode);
  };

  const handleStartGame = () => {

    if (filteredCountries.length > 0) {
      onStartGame({
        countries: filteredCountries,
        gameMode: selectedGameMode,
        region: selectedRegion,
        gameType
      });
      console.log('Iniciando juego con países:', filteredCountries.length);
      console.log('Modo de juego:', selectedGameMode);
    }
  };

  if (loading) {
    return <div>Loading countries...</div>;
  }

  return (
    <div className="game-page">
      <h1 className="game-title">Choose your options</h1>
      <h3 className="game-mode-text">Select region:</h3>
      <div className="region-buttons">
        <Button
          isSelectable
          isSelected={selectedRegion === 'World'}
          onClick={() => handleRegionSelect('World')}
        >
          World
        </Button>
        <Button
          isSelectable
          isSelected={selectedRegion === 'Europe'}
          onClick={() => handleRegionSelect('Europe')}
        >
          Europe
        </Button>
        <Button
          isSelectable
          isSelected={selectedRegion === 'Americas'}
          onClick={() => handleRegionSelect('Americas')}
        >
          America
        </Button>
        <Button
          isSelectable
          isSelected={selectedRegion === 'Asia'}
          onClick={() => handleRegionSelect('Asia')}
        >
          Asia
        </Button>
        <Button
          isSelectable
          isSelected={selectedRegion === 'Africa'}
          onClick={() => handleRegionSelect('Africa')}
        >
          Africa
        </Button>
        <Button
          isSelectable
          isSelected={selectedRegion === 'Oceania'}
          onClick={() => handleRegionSelect('Oceania')}
        >
          Oceania
        </Button>
      </div>


      <div className="game-mode-buttons">
        <h3 className="game-mode-text">Select game mode:</h3>
        <div className="flex gap-4">
          <Button
            isSelectable
            isSelected={selectedGameMode === 'blitz'}
            onClick={() => handleGameModeSelect('blitz')}
          >
            Blitz
          </Button>
          <Button
            isSelectable
            isSelected={selectedGameMode === 'relax'}
            onClick={() => handleGameModeSelect('relax')}
          >
            Relax
          </Button>
        </div>
      </div>

      {children}

      <div className="start-button mt-4">
        <Button onClick={handleStartGame}>
          PLAY
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
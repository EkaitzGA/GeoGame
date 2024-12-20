import React, { useState, useEffect } from 'react';
import { fetchAllCountries } from '../../utils/apiCall';
import Button from '../button/button';

const FlagPage = () => {
  const [selectedRegions, setSelectedRegions] = useState(['All']);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
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
      if (selectedRegions.includes('All')) {
        setFilteredCountries(countries);
        console.log('Mostrando todos los países:', countries.length);
      } else {
        const filtered = countries.filter(country => 
          selectedRegions.includes(country.region)
        );
        setFilteredCountries(filtered);
        console.log(`Países filtrados de ${selectedRegions.join(' y ')}:`, filtered.length);
      }
    }
  }, [selectedRegions, countries]);

  const handleRegionSelect = (region) => {
    setSelectedRegions(prevSelected => {
      if (region === 'All') {
        return ['All'];
      }
      
      if (prevSelected.includes('All')) {
        return [region];
      }

      if (prevSelected.includes(region)) {
        if (prevSelected.length === 1) {
          return ['All'];
        }
        return prevSelected.filter(r => r !== region);
      } else {
        return [...prevSelected, region];
      }
    });
  };

  const handleGameModeSelect = (mode) => {
    setSelectedGameMode(mode);
    setError('');
  };

  const handleStartGame = () => {
    if (!selectedGameMode) {
      setError('Por favor, selecciona un modo de juego antes de comenzar');
      return;
    }

    if (filteredCountries.length > 0) {
      console.log('Iniciando juego con países:', filteredCountries.length);
      console.log('Modo de juego:', selectedGameMode);
      // Aquí iría la lógica para iniciar el juego
    }
  };

  if (loading) {
    return <div>Cargando países...</div>;
  }

  return (
    <div className="flag-page">
      <div className="region-buttons">
        <Button 
          isSelectable
          isSelected={selectedRegions.includes('All')}
          onClick={() => handleRegionSelect('All')}
        >
          Todos los países
        </Button>
        <Button 
          isSelectable
          isSelected={selectedRegions.includes('Europe')}
          onClick={() => handleRegionSelect('Europe')}
          disabled={selectedRegions.includes('All')}
        >
          Europa
        </Button>
        <Button 
          isSelectable
          isSelected={selectedRegions.includes('Americas')}
          onClick={() => handleRegionSelect('Americas')}
          disabled={selectedRegions.includes('All')}
        >
          América
        </Button>
        <Button 
          isSelectable
          isSelected={selectedRegions.includes('Asia')}
          onClick={() => handleRegionSelect('Asia')}
          disabled={selectedRegions.includes('All')}
        >
          Asia
        </Button>
        <Button 
          isSelectable
          isSelected={selectedRegions.includes('Africa')}
          onClick={() => handleRegionSelect('Africa')}
          disabled={selectedRegions.includes('All')}
        >
          Africa
        </Button>
        <Button 
          isSelectable
          isSelected={selectedRegions.includes('Oceania')}
          onClick={() => handleRegionSelect('Oceania')}
          disabled={selectedRegions.includes('All')}
        >
          Oceania
        </Button>
      </div>

      <div className="selected-regions">
        <p>
          {selectedRegions.includes('All') 
            ? 'Jugando con todos los países' 
            : `Jugando con países de: ${selectedRegions.join(', ')}`}
        </p>
      </div>

      <div className="game-mode-buttons">
        <h3 className="text-lg font-semibold mb-2">Selecciona el modo de juego:</h3>
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

      {error && (
        <div className="error-message text-red-500 mt-2">
          {error}
        </div>
      )}

      <div className="start-button mt-4">
        <Button onClick={handleStartGame}>
          Iniciar Juego
        </Button>
      </div>
    </div>
  );
};

export default FlagPage;
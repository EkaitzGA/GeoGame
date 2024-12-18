const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/independent`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Datos recibidos:', data.length, 'países');
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};


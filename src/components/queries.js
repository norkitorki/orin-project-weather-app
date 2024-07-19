const API_KEY = process.env.WEATHER_API_KEY;

export function getLocationData(query) {
  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`;
  return fetchData(url);
}

export function getWeatherData(query, forecastDays = 3) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${forecastDays}&aqi=no&alerts=no`;
  return fetchData(url);
}

async function fetchData(url) {
  try {
    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
      throw new Error('A network error has occured. Please check your internet connection and try again.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

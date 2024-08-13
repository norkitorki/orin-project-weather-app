import './stylesheets/meyer-reset.css';
import './stylesheets/style.css';

import {
  displayWeather,
  selectLocation,
  displayError,
  hideError,
} from './components/weather_display';

import { getLocationData, getWeatherData } from './components/queries';

import { loading } from './components/loading';

document.querySelector('form').addEventListener('submit', submitQuery);

displayWeather(submitWeatherQuery);

function submitQuery(e) {
  e.preventDefault();

  const input = document.getElementById('location');
  if (!input || input.value === '') {
    displayError('Please provide a location');
    return;
  }

  const locations = JSON.parse(String(localStorage.getItem('location_data')));
  const lastQuery = localStorage.getItem('last_query') || '';

  if (
    locations &&
    locations.length > 1 &&
    input.value.toLowerCase() === lastQuery.toLowerCase()
  ) {
    selectLocation(locations);
  } else {
    submitLocationQuery(input.value);
  }
}

async function submitWeatherQuery(query) {
  try {
    loading.show();
    const data = await getWeatherData(query);
    console.log('Fetched weather data');

    localStorage.setItem('weather_data', JSON.stringify(data));
    localStorage.setItem('location_url', query);
    displayWeather(submitWeatherQuery);
    hideError();
  } catch (error) {
    displayError(error.message);
  } finally {
    loading.hide();
  }
}

async function submitLocationQuery(query) {
  try {
    loading.show();
    const data = await getLocationData(query);
    console.log('Fetched location data');

    if (data.length === 0) {
      displayError('Sorry, no weather for the requested location was found');
    } else {
      localStorage.setItem('last_query', query);
      localStorage.setItem('location_data', JSON.stringify(data));
      if (data.length === 1) {
        submitWeatherQuery(data[0].url);
      } else {
        selectLocation(data, submitWeatherQuery);
      }
      hideError();
    }
  } catch (error) {
    displayError(error.message);
  } finally {
    loading.hide();
  }
}

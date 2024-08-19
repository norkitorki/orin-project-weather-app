import { displayMap } from './map_display';

const error = document.querySelector('.error');

localStorage.setItem('unit', localStorage.getItem('unit') || 'm');

export function displayWeather(refreshCallback, day = []) {
  const data = JSON.parse(String(localStorage.getItem('weather_data')));

  if (data) {
    const refreshBtn = document.getElementById('refresh-weather');
    const convertBtn = document.getElementById('convert-unit');

    refreshBtn.parentElement.classList.remove('hidden');

    if (refreshCallback) {
      refreshBtn.addEventListener('click', () => {
        refreshCallback.call(this, localStorage.getItem('location_url'));
      });
    }

    convertBtn.textContent =
      localStorage.getItem('unit') === 'm' ? 'Metric' : 'Imperial';
    convertBtn.addEventListener('click', convertUnits);

    const forecasts = data.forecast.forecastday;
    const localHour = new Date(data.current.last_updated).getHours();

    if (day.length > 0) {
      const lastUpdate = data.current.last_updated;
      data.current = data.forecast.forecastday[day[0]].hour[day[1]];
      data.current.last_updated = lastUpdate;
    }

    updateCurrentWeather(data.current, data.location);
    updateWeatherForecast(forecasts, localHour, data.location);
    displayMap(data.location.lat, data.location.lon);
    document.querySelector('.weather-data').classList.remove('hidden');

    return true;
  } else {
    return false;
  }
}

export function selectLocation(locations, callback) {
  const container = document.querySelector('.location-select');
  container.innerHTML = '';

  let button;
  locations.forEach((location) => {
    button = document.createElement('button');
    button.textContent = `${location.name}(${location.region}), ${location.country}`;
    button.addEventListener('click', () => {
      container.innerHTML = '';
      if (callback) {
        callback.call(this, location.url);
      }
    });

    container.appendChild(button);
  });
}

export function displayError(message) {
  error.textContent = message;
  error.classList.add('error-visible');
  console.error(message);
}

export function hideError() {
  error.classList.remove('error-visible');
}

function colorTemps() {
  this.classList.value = 'temp';
  const currentTemp = Number(this.dataset['m'].match(/^\d+/));

  if (currentTemp > 30) {
    this.classList.add('very-hot');
  } else if (currentTemp > 20) {
    this.classList.add('hot');
  } else if (currentTemp < 10) {
    this.classList.add('cold');
  }
}

function setTemperatures(data, element) {
  setUnits(
    `${Math.round(data.temp_c)} c°`,
    `${Math.round(data.temp_f)} f°`,
    element,
    [colorTemps.bind(element)]
  );
}

function updateCurrentWeather(weatherData, locationData, localDate) {
  const container = document.querySelector('.weather-data .current');
  container.innerHTML = '';

  const template = document
    .getElementById('weather-template')
    .content.cloneNode(true);

  const locationName = template.querySelector('.location-name');
  const locationTime = template.querySelector('.location-time');
  const conditionIcon = template.querySelector('.condition-icon');
  const condition = template.querySelector('.condition');
  const date = template.querySelector('.date');
  const lastUpdate = template.querySelector('.last-update');
  const temperature = template.querySelector('.temperature');
  const humidity = template.querySelector('.humidity');
  const airPressure = template.querySelector('.air-pressure');
  const precipitation = template.querySelector('.precipitation');
  const wind = template.querySelector('.wind');
  const windDirection = template.querySelector('.wind-direction');
  const visibility = template.querySelector('.visibility');

  locationName.textContent = `${locationData.name} (${locationData.region}), ${locationData.country}`;
  locationTime.textContent = (
    weatherData.time || weatherData.last_updated
  ).match(/\d{2}:\d{2}$/)[0];

  conditionIcon.src = weatherData.condition.icon.replace(/^\/\//, 'https://');
  condition.textContent = weatherData.condition.text;

  date.textContent = localDate || locationData.localtime.split(' ')[0];

  lastUpdate.textContent = JSON.parse(
    localStorage.getItem('weather_data')
  ).current.last_updated.split(' ')[1];

  humidity.textContent = `${weatherData.humidity}%`;

  setTemperatures(weatherData, temperature);
  setAirPressure(weatherData, airPressure);
  setPrecipitation(weatherData, precipitation);
  setWind(weatherData, wind, windDirection);
  setVisibility(weatherData, visibility);

  container.prepend(template);
}

function updateWeatherForecast(data, localHour, locationData) {
  const container = document.querySelector('.forecasts');
  container.innerHTML = '';

  let template, image, temperature, time;
  const dayDescriptor = ['Today', 'Tomorrow', 'In 2 days'];

  data.forEach((day, i) => {
    template = document
      .getElementById('forecast-template')
      .content.cloneNode(true);

    template.querySelector(
      'h3'
    ).textContent = `${dayDescriptor[i]} (${day.date})`;

    day.hour.forEach((hour, y) => {
      const element = template.querySelector(`.hour-${y}`);

      element.addEventListener('click', () => {
        updateCurrentWeather(hour, locationData, day.date);
        const locationInfo = document.querySelector('.weather-data');
        locationInfo.scrollIntoView({ behavior: 'smooth' });
      });

      if (i === 0) {
        if (y < localHour) {
          element.classList.add('passed-hour');
        } else if (y === localHour) {
          element.classList.add('current-hour');
        }
      }

      time = document.createElement('h3');
      time.textContent = y;

      image = document.createElement('img');
      image.src = `https:${hour.condition.icon}`;

      temperature = document.createElement('span');
      temperature.classList.add('temp');
      setTemperatures(hour, temperature);

      [time, image, temperature].forEach((el) => element.appendChild(el));
    });

    container.appendChild(template);
  });
}

function setAirPressure(data, element) {
  setUnits(`${data.pressure_mb} mb`, `${data.pressure_in} in`, element);
}

function setPrecipitation(data, element) {
  setUnits(`${data.precip_mm} mm`, `${data.precip_in} in`, element);
}

function setWind(data, element, windDirectionArrow) {
  setUnits(
    `${data.wind_dir}(${data.wind_degree}deg) at ${Math.round(
      data.wind_kph
    )} kph`,
    `${data.wind_dir}(${data.wind_degree}deg) at ${Math.round(
      data.wind_mph
    )} mph`,
    element
  );

  windDirectionArrow.setAttribute(
    'style',
    `transform:rotate(${data.wind_degree}deg)`
  );
}

function setVisibility(data, element) {
  setUnits(`${data.vis_km} km`, `${data.vis_miles} miles`, element);
}

function setUnits(value_m, value_i, element, callbacks = []) {
  element.dataset['m'] = value_m;
  element.dataset['i'] = value_i;

  const unit = localStorage.getItem('unit') || 'm';
  element.textContent = element.dataset[unit];

  callbacks.forEach((cb) => cb.call());
}

function convertUnits(e) {
  const currentUnit = localStorage.getItem('unit');
  const newUnit = currentUnit === 'm' ? 'i' : 'm';

  document.querySelectorAll(`[data-${newUnit}]`).forEach((el) => {
    el.textContent = el.dataset[newUnit];
  });

  e.target.textContent = newUnit === 'm' ? 'Metric' : 'Imperial';
  localStorage.setItem('unit', newUnit);
}

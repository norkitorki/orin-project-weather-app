const error = document.querySelector('.error');
const locationName = document.querySelector('.location-name');
const conditionIcon = document.querySelector('.condition-icon');
const temperature = document.querySelector('.current-temperature');
const condition = document.querySelector('.condition');
const typeBtn = document.getElementById('convert-unit');
const refreshBtn = document.querySelector('.refresh-weather');

localStorage.setItem('unit', localStorage.getItem('unit') || 'c');

export function displayWeather(refreshCallback) {
  const weather = JSON.parse(String(localStorage.getItem('weather_data')));

  if (weather) {
    const forecasts = weather.forecast.forecastday;
    const localHour = new Date(weather.current.last_updated).getHours();

    updateCurrentWeather(weather, forecasts[0], localHour);
    updateWeatherForecast(forecasts, localHour);
    document.querySelector('.weather-data').classList.remove('hidden');

    typeBtn.classList.remove('hidden');
    typeBtn.textContent =
      localStorage.getItem('unit') === 'c' ? 'Celsius' : 'Fahrenheit';
    typeBtn.addEventListener('click', convertTemperatures);

    refreshBtn.addEventListener(
      'click',
      refreshCallback.bind(this, localStorage.getItem('location_url'))
    );

    return true;
  } else {
    return false;
  }
}

function updateCurrentWeather(data, forecast, localHour) {
  locationName.textContent = `${data.location.name} (${data.location.region}), ${data.location.country}`;
  conditionIcon.src = data.current.condition.icon.replace(/^\/\//, 'https://');
  setTemperatures(forecast.hour[localHour - 1], temperature);
  condition.textContent = data.current.condition.text;
}

function updateWeatherForecast(data, localHour) {
  const container = document.querySelector('.weather-forecasts');
  container.innerHTML = '';

  let template, image, temperature, time;
  const days = ['Today', 'Tomorrow', 'In 2 days'];

  data.forEach((day, i) => {
    template = document
      .getElementById('forecast-template')
      .content.cloneNode(true);

    template.querySelector('h3').textContent = `${days[i]} (${day.date})`;

    day.hour.forEach((hour, y) => {
      const element = template.querySelector(`.hour-${y}`);

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
      image.src = hour.condition.icon.replace(/^\/\//, 'https://');

      temperature = document.createElement('span');
      temperature.classList.add('temp');
      setTemperatures(hour, temperature);

      [time, image, temperature].forEach((el) => element.appendChild(el));
    });

    container.appendChild(template);
  });
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
      callback(location.url);
    });

    container.appendChild(button);
  });

  document.body.insertBefore(container, form);
}

function colorTemps(element) {
  element.classList.value = 'temp';
  const currentTemp = Number(element.dataset['c']);

  if (currentTemp > 30) {
    element.classList.add('very-hot');
  } else if (currentTemp > 20) {
    element.classList.add('hot');
  } else if (currentTemp < 10) {
    element.classList.add('cold');
  }
}

function convertTemperatures(e) {
  const value = e.target.textContent === 'Celsius' ? 'Fahrenheit' : 'Celsius';
  const unit = value[0].toLowerCase();
  localStorage.setItem('unit', unit);

  document.querySelectorAll('.temp').forEach((el) => {
    colorTemps(el);
    el.textContent = `${el.dataset[`${unit}`]} ${unit}°`;
  });

  e.target.textContent = value;
}

function setTemperatures(data, element) {
  element.dataset['c'] = Math.round(data.dewpoint_c);
  element.dataset['f'] = Math.round(data.dewpoint_f);
  const unit = localStorage.getItem('unit');
  colorTemps(element);
  element.textContent = `${element.dataset[unit]} ${unit}°`;
}

export function displayError(message) {
  error.textContent = message;
  error.classList.add('error-visible');
  console.error(message);
}

export function hideError() {
  error.classList.remove('error-visible');
}

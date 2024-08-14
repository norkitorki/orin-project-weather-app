/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/stylesheets/meyer-reset.css":
/*!*****************************************!*\
  !*** ./src/stylesheets/meyer-reset.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/stylesheets/meyer-reset.css?");

/***/ }),

/***/ "./src/stylesheets/style.css":
/*!***********************************!*\
  !*** ./src/stylesheets/style.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/stylesheets/style.css?");

/***/ }),

/***/ "./src/components/loading.js":
/*!***********************************!*\
  !*** ./src/components/loading.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loading: () => (/* binding */ loading)\n/* harmony export */ });\nconst loadingContainer = document.querySelector('.loading');\n\nfunction show() {\n  loadingContainer.classList.remove('hidden');\n  loadingContainer.parentElement.classList.add('loading-in-progress');\n}\n\nfunction hide() {\n  loadingContainer.classList.add('hidden');\n  loadingContainer.parentElement.classList.remove('loading-in-progress');\n}\n\nconst loading = { show, hide };\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/components/loading.js?");

/***/ }),

/***/ "./src/components/queries.js":
/*!***********************************!*\
  !*** ./src/components/queries.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getLocationData: () => (/* binding */ getLocationData),\n/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData)\n/* harmony export */ });\nconst API_KEY = \"218a60f743ba4c51a1154257241506\";\n\nfunction getLocationData(query) {\n  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`;\n  return fetchData(url);\n}\n\nfunction getWeatherData(query, forecastDays = 3) {\n  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${forecastDays}&aqi=no&alerts=no`;\n  return fetchData(url);\n}\n\nasync function fetchData(url) {\n  try {\n    const response = await fetch(url, { mode: 'cors' });\n\n    if (!response.ok) {\n      throw new Error('A network error has occured. Please check your internet connection and try again.');\n    }\n\n    return await response.json();\n  } catch (error) {\n    throw error;\n  }\n}\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/components/queries.js?");

/***/ }),

/***/ "./src/components/weather_display.js":
/*!*******************************************!*\
  !*** ./src/components/weather_display.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayError: () => (/* binding */ displayError),\n/* harmony export */   displayWeather: () => (/* binding */ displayWeather),\n/* harmony export */   hideError: () => (/* binding */ hideError),\n/* harmony export */   selectLocation: () => (/* binding */ selectLocation)\n/* harmony export */ });\nconst error = document.querySelector('.error');\n\nlocalStorage.setItem('unit', localStorage.getItem('unit') || 'm');\n\nfunction displayWeather(refreshCallback, day = []) {\n  const data = JSON.parse(String(localStorage.getItem('weather_data')));\n\n  if (data) {\n    const refreshBtn = document.getElementById('refresh-weather');\n    const convertBtn = document.getElementById('convert-unit');\n\n    refreshBtn.parentElement.classList.remove('hidden');\n\n    if (refreshCallback) {\n      refreshBtn.addEventListener('click', () => {\n        refreshCallback.call(this, localStorage.getItem('location_url'));\n      });\n    }\n\n    convertBtn.textContent =\n      localStorage.getItem('unit') === 'm' ? 'Metric' : 'Imperial';\n    convertBtn.addEventListener('click', convertUnits);\n\n    const forecasts = data.forecast.forecastday;\n    const localHour = new Date(data.current.last_updated).getHours();\n\n    if (day.length > 0) {\n      const lastUpdate = data.current.last_updated;\n      data.current = data.forecast.forecastday[day[0]].hour[day[1]];\n      data.current.last_updated = lastUpdate;\n    }\n\n    updateCurrentWeather(data.current, data.location);\n    updateWeatherForecast(forecasts, localHour, data.location);\n    document.querySelector('.weather-data').classList.remove('hidden');\n\n    return true;\n  } else {\n    return false;\n  }\n}\n\nfunction updateCurrentWeather(weatherData, locationData) {\n  console.log(weatherData);\n\n  const container = document.querySelector('.weather-data > .current');\n  container.innerHTML = '';\n\n  const template = document\n    .getElementById('weather-template')\n    .content.cloneNode(true);\n\n  const locationName = template.querySelector('.location-name');\n  const locationTime = template.querySelector('.location-time');\n  const conditionIcon = template.querySelector('.condition-icon');\n  const condition = template.querySelector('.condition');\n  const lastUpdate = template.querySelector('.last-update');\n  const temperature = template.querySelector('.temperature');\n  const humidity = template.querySelector('.humidity');\n  const airPressure = template.querySelector('.air-pressure');\n  const precipitation = template.querySelector('.precipitation');\n  const wind = template.querySelector('.wind');\n  const windDirection = template.querySelector('.wind-direction');\n  const visibility = template.querySelector('.visibility');\n\n  lastUpdate.textContent = JSON.parse(\n    localStorage.getItem('weather_data')\n  ).current.last_updated.split(' ')[1];\n\n  locationName.textContent = `${locationData.name} (${locationData.region}), ${locationData.country}`;\n  locationTime.textContent = (\n    weatherData.time || weatherData.last_updated\n  ).match(/\\d{2}:\\d{2}$/)[0];\n\n  conditionIcon.src = weatherData.condition.icon.replace(/^\\/\\//, 'https://');\n  condition.textContent = weatherData.condition.text;\n\n  humidity.textContent = `${weatherData.humidity}%`;\n\n  setTemperatures(weatherData, temperature);\n  setAirPressure(weatherData, airPressure);\n  setPrecipitation(weatherData, precipitation);\n  setWind(weatherData, wind, windDirection);\n  setVisibility(weatherData, visibility);\n\n  container.prepend(template);\n}\n\nfunction updateWeatherForecast(data, localHour, locationData) {\n  const container = document.querySelector('.forecasts');\n  container.innerHTML = '';\n\n  let template, image, temperature, time;\n  const dayDescriptor = ['Today', 'Tomorrow', 'In 2 days'];\n\n  data.forEach((day, i) => {\n    template = document\n      .getElementById('forecast-template')\n      .content.cloneNode(true);\n\n    template.querySelector(\n      'h3'\n    ).textContent = `${dayDescriptor[i]} (${day.date})`;\n\n    day.hour.forEach((hour, y) => {\n      const element = template.querySelector(`.hour-${y}`);\n\n      element.addEventListener('click', () => {\n        updateCurrentWeather(hour, locationData, null);\n        const locationInfo = document.querySelector('.weather-data');\n        locationInfo.scrollIntoView({ behavior: 'smooth' });\n      });\n\n      if (i === 0) {\n        if (y < localHour) {\n          element.classList.add('passed-hour');\n        } else if (y === localHour) {\n          element.classList.add('current-hour');\n        }\n      }\n\n      time = document.createElement('h3');\n      time.textContent = y;\n\n      image = document.createElement('img');\n      image.src = `https:${hour.condition.icon}`;\n\n      temperature = document.createElement('span');\n      temperature.classList.add('temp');\n      setTemperatures(hour, temperature);\n\n      [time, image, temperature].forEach((el) => element.appendChild(el));\n    });\n\n    container.appendChild(template);\n  });\n}\n\nfunction selectLocation(locations, callback) {\n  const container = document.querySelector('.location-select');\n  container.innerHTML = '';\n\n  let button;\n  locations.forEach((location) => {\n    button = document.createElement('button');\n    button.textContent = `${location.name}(${location.region}), ${location.country}`;\n    button.addEventListener('click', () => {\n      container.innerHTML = '';\n      if (callback) {\n        callback.call(this, location.url);\n      }\n    });\n\n    container.appendChild(button);\n  });\n}\n\nfunction colorTemps() {\n  this.classList.value = 'temp';\n  const currentTemp = Number(this.dataset['m'].match(/^\\d+/));\n\n  if (currentTemp > 30) {\n    this.classList.add('very-hot');\n  } else if (currentTemp > 20) {\n    this.classList.add('hot');\n  } else if (currentTemp < 10) {\n    this.classList.add('cold');\n  }\n}\n\nfunction setTemperatures(data, element) {\n  setUnits(\n    `${Math.round(data.temp_c)} c°`,\n    `${Math.round(data.temp_f)} f°`,\n    element,\n    [colorTemps.bind(element)]\n  );\n}\n\nfunction setAirPressure(data, element) {\n  setUnits(`${data.pressure_mb} mb`, `${data.pressure_in} in`, element);\n}\n\nfunction setPrecipitation(data, element) {\n  setUnits(`${data.precip_mm} mm`, `${data.precip_in} in`, element);\n}\n\nfunction setWind(data, element, windDirectionArrow) {\n  setUnits(\n    `${data.wind_dir}(${data.wind_degree}deg) at ${Math.round(\n      data.wind_kph\n    )} kph`,\n    `${data.wind_dir}(${data.wind_degree}deg) at ${Math.round(\n      data.wind_mph\n    )} mph`,\n    element\n  );\n\n  windDirectionArrow.setAttribute(\n    'style',\n    `transform:rotate(${data.wind_degree}deg)`\n  );\n}\n\nfunction setVisibility(data, element) {\n  setUnits(`${data.vis_km} km`, `${data.vis_miles} miles`, element);\n}\n\nfunction setUnits(value_m, value_i, element, callbacks = []) {\n  element.dataset['m'] = value_m;\n  element.dataset['i'] = value_i;\n\n  const unit = localStorage.getItem('unit') || 'm';\n  element.textContent = element.dataset[unit];\n\n  callbacks.forEach((cb) => cb.call());\n}\n\nfunction convertUnits(e) {\n  const currentUnit = localStorage.getItem('unit');\n  const newUnit = currentUnit === 'm' ? 'i' : 'm';\n\n  document.querySelectorAll(`[data-${newUnit}]`).forEach((el) => {\n    el.textContent = el.dataset[newUnit];\n  });\n\n  e.target.textContent = newUnit === 'm' ? 'Metric' : 'Imperial';\n  localStorage.setItem('unit', newUnit);\n}\n\nfunction displayError(message) {\n  error.textContent = message;\n  error.classList.add('error-visible');\n  console.error(message);\n}\n\nfunction hideError() {\n  error.classList.remove('error-visible');\n}\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/components/weather_display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylesheets_meyer_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stylesheets/meyer-reset.css */ \"./src/stylesheets/meyer-reset.css\");\n/* harmony import */ var _stylesheets_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylesheets/style.css */ \"./src/stylesheets/style.css\");\n/* harmony import */ var _components_weather_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/weather_display */ \"./src/components/weather_display.js\");\n/* harmony import */ var _components_queries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/queries */ \"./src/components/queries.js\");\n/* harmony import */ var _components_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/loading */ \"./src/components/loading.js\");\n\n\n\n\n\n\n\n\n\ndocument.querySelector('form').addEventListener('submit', submitQuery);\n\n(0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.displayWeather)(submitWeatherQuery);\n\nfunction submitQuery(e) {\n  e.preventDefault();\n\n  const input = document.getElementById('location');\n  if (!input || input.value === '') {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.displayError)('Please provide a location');\n    return;\n  }\n\n  const locations = JSON.parse(String(localStorage.getItem('location_data')));\n  const lastQuery = localStorage.getItem('last_query') || '';\n\n  if (\n    locations &&\n    locations.length > 1 &&\n    input.value.toLowerCase() === lastQuery.toLowerCase()\n  ) {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.selectLocation)(locations, submitWeatherQuery);\n  } else {\n    submitLocationQuery(input.value);\n  }\n}\n\nasync function submitWeatherQuery(query) {\n  try {\n    _components_loading__WEBPACK_IMPORTED_MODULE_4__.loading.show();\n    const data = await (0,_components_queries__WEBPACK_IMPORTED_MODULE_3__.getWeatherData)(query);\n\n    localStorage.setItem('weather_data', JSON.stringify(data));\n    localStorage.setItem('location_url', query);\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.displayWeather)(submitWeatherQuery);\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.hideError)();\n  } catch (error) {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.displayError)(error.message);\n  } finally {\n    _components_loading__WEBPACK_IMPORTED_MODULE_4__.loading.hide();\n  }\n}\n\nasync function submitLocationQuery(query) {\n  try {\n    _components_loading__WEBPACK_IMPORTED_MODULE_4__.loading.show();\n    const data = await (0,_components_queries__WEBPACK_IMPORTED_MODULE_3__.getLocationData)(query);\n\n    if (data.length === 0) {\n      (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.displayError)('Sorry, no weather for the requested location was found');\n    } else {\n      localStorage.setItem('last_query', query);\n      localStorage.setItem('location_data', JSON.stringify(data));\n      if (data.length === 1) {\n        submitWeatherQuery(data[0].url);\n      } else {\n        (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.selectLocation)(data, submitWeatherQuery);\n      }\n      (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.hideError)();\n    }\n  } catch (error) {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_2__.displayError)(error.message);\n  } finally {\n    _components_loading__WEBPACK_IMPORTED_MODULE_4__.loading.hide();\n  }\n}\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
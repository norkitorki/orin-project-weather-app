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

/***/ "./src/components/queries.js":
/*!***********************************!*\
  !*** ./src/components/queries.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getLocationData: () => (/* binding */ getLocationData),\n/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData)\n/* harmony export */ });\nconst API_KEY = \"218a60f743ba4c51a1154257241506\";\nconsole.log(API_KEY);\n\nfunction getLocationData(query) {\n  const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`;\n  return fetchData(url);\n}\n\nfunction getWeatherData(query, forecastDays = 3) {\n  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${forecastDays}&aqi=no&alerts=no`;\n  return fetchData(url);\n}\n\nasync function fetchData(url) {\n  try {\n    const response = await fetch(url, { mode: 'cors' });\n\n    if (!response.ok) {\n      throw new Error('A network error has occured. Please check your internet connection and try again.');\n    }\n\n    return await response.json();\n  } catch (error) {\n    throw error;\n  }\n}\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/components/queries.js?");

/***/ }),

/***/ "./src/components/weather_display.js":
/*!*******************************************!*\
  !*** ./src/components/weather_display.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayError: () => (/* binding */ displayError),\n/* harmony export */   displayWeather: () => (/* binding */ displayWeather),\n/* harmony export */   hideError: () => (/* binding */ hideError),\n/* harmony export */   selectLocation: () => (/* binding */ selectLocation)\n/* harmony export */ });\nconst error = document.querySelector('.error');\nconst locationName = document.querySelector('.location-name');\nconst conditionIcon = document.querySelector('.condition-icon');\nconst temperature = document.querySelector('.current-temperature');\nconst condition = document.querySelector('.condition');\nconst typeBtn = document.getElementById('convert-unit');\nconst refreshBtn = document.querySelector('.refresh-weather');\n\nlocalStorage.setItem('unit', localStorage.getItem('unit') || 'c');\n\nfunction displayWeather(refreshCallback) {\n  const weather = JSON.parse(String(localStorage.getItem('weather_data')));\n\n  if (weather) {\n    const forecasts = weather.forecast.forecastday;\n    const localHour = new Date(weather.current.last_updated).getHours();\n\n    updateCurrentWeather(weather, forecasts[0], localHour);\n    updateWeatherForecast(forecasts, localHour);\n    document.querySelector('.weather-data').classList.remove('hidden');\n\n    typeBtn.classList.remove('hidden');\n    typeBtn.textContent =\n      localStorage.getItem('unit') === 'c' ? 'Celsius' : 'Fahrenheit';\n    typeBtn.addEventListener('click', convertTemperatures);\n\n    refreshBtn.addEventListener(\n      'click',\n      refreshCallback.bind(this, localStorage.getItem('location_url'))\n    );\n\n    return true;\n  } else {\n    return false;\n  }\n}\n\nfunction updateCurrentWeather(data, forecast, localHour) {\n  locationName.textContent = `${data.location.name} (${data.location.region}), ${data.location.country}`;\n  conditionIcon.src = data.current.condition.icon.replace(/^\\/\\//, 'https://');\n  setTemperatures(forecast.hour[localHour - 1], temperature);\n  condition.textContent = data.current.condition.text;\n}\n\nfunction updateWeatherForecast(data, localHour) {\n  const container = document.querySelector('.weather-forecasts');\n  container.innerHTML = '';\n\n  let template, image, temperature, time;\n  const days = ['Today', 'Tomorrow', 'In 2 days'];\n\n  data.forEach((day, i) => {\n    template = document\n      .getElementById('forecast-template')\n      .content.cloneNode(true);\n\n    template.querySelector('h3').textContent = `${days[i]} (${day.date})`;\n\n    day.hour.forEach((hour, y) => {\n      const element = template.querySelector(`.hour-${y}`);\n\n      if (i === 0) {\n        if (y < localHour) {\n          element.classList.add('passed-hour');\n        } else if (y === localHour) {\n          element.classList.add('current-hour');\n        }\n      }\n\n      time = document.createElement('h3');\n      time.textContent = y;\n\n      image = document.createElement('img');\n      image.src = hour.condition.icon.replace(/^\\/\\//, 'https://');\n\n      temperature = document.createElement('span');\n      temperature.classList.add('temp');\n      setTemperatures(hour, temperature);\n\n      [time, image, temperature].forEach((el) => element.appendChild(el));\n    });\n\n    container.appendChild(template);\n  });\n}\n\nfunction selectLocation(locations, callback) {\n  const container = document.querySelector('.location-select');\n  container.innerHTML = '';\n\n  let button;\n  locations.forEach((location) => {\n    button = document.createElement('button');\n    button.textContent = `${location.name}(${location.region}), ${location.country}`;\n    button.addEventListener('click', () => {\n      container.innerHTML = '';\n      callback(location.url);\n    });\n\n    container.appendChild(button);\n  });\n\n  document.body.insertBefore(container, form);\n}\n\nfunction colorTemps(element) {\n  element.classList.value = 'temp';\n  const currentTemp = Number(element.dataset['c']);\n\n  if (currentTemp > 30) {\n    element.classList.add('very-hot');\n  } else if (currentTemp > 20) {\n    element.classList.add('hot');\n  } else if (currentTemp < 10) {\n    element.classList.add('cold');\n  }\n}\n\nfunction convertTemperatures(e) {\n  const value = e.target.textContent === 'Celsius' ? 'Fahrenheit' : 'Celsius';\n  const unit = value[0].toLowerCase();\n  localStorage.setItem('unit', unit);\n\n  document.querySelectorAll('.temp').forEach((el) => {\n    colorTemps(el);\n    el.textContent = `${el.dataset[`${unit}`]} ${unit}°`;\n  });\n\n  e.target.textContent = value;\n}\n\nfunction setTemperatures(data, element) {\n  element.dataset['c'] = Math.round(data.dewpoint_c);\n  element.dataset['f'] = Math.round(data.dewpoint_f);\n  const unit = localStorage.getItem('unit');\n  colorTemps(element);\n  element.textContent = `${element.dataset[unit]} ${unit}°`;\n}\n\nfunction displayError(message) {\n  error.textContent = message;\n  error.classList.add('error-visible');\n  console.error(message);\n}\n\nfunction hideError() {\n  error.classList.remove('error-visible');\n}\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/components/weather_display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_weather_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/weather_display */ \"./src/components/weather_display.js\");\n/* harmony import */ var _components_queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/queries */ \"./src/components/queries.js\");\n\n\n\n\ndocument.querySelector('form').addEventListener('submit', submitQuery);\n\n(0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.displayWeather)(submitWeatherQuery);\n\nfunction submitQuery(e) {\n  e.preventDefault();\n\n  const input = document.getElementById('location');\n  if (!input || input.value === '') {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.displayError)('Please provide a location');\n    return;\n  }\n\n  const locations = JSON.parse(String(localStorage.getItem('location_data')));\n  const lastQuery = localStorage.getItem('last_query') || '';\n\n  if (\n    locations &&\n    locations.length > 1 &&\n    input.value.toLowerCase() === lastQuery.toLowerCase()\n  ) {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.selectLocation)(locations);\n  } else {\n    submitLocationQuery(input.value);\n  }\n}\n\nasync function submitWeatherQuery(query) {\n  try {\n    const data = await (0,_components_queries__WEBPACK_IMPORTED_MODULE_1__.getWeatherData)(query);\n    console.log('Fetched weather data');\n\n    localStorage.setItem('weather_data', JSON.stringify(data));\n    localStorage.setItem('location_url', query);\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.displayWeather)(submitWeatherQuery);\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.hideError)();\n  } catch (error) {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.displayError)(error.message);\n  }\n}\n\nasync function submitLocationQuery(query) {\n  try {\n    const data = await (0,_components_queries__WEBPACK_IMPORTED_MODULE_1__.getLocationData)(query);\n    console.log('Fetched location data');\n\n    if (data.length === 0) {\n      (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.displayError)('Sorry, no weather for the requested location was found');\n    } else {\n      localStorage.setItem('last_query', query);\n      localStorage.setItem('location_data', JSON.stringify(data));\n      if (data.length === 1) {\n        submitWeatherQuery(data[0].url);\n      } else {\n        (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.selectLocation)(data, submitWeatherQuery);\n      }\n      (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.hideError)();\n    }\n  } catch (error) {\n    (0,_components_weather_display__WEBPACK_IMPORTED_MODULE_0__.displayError)(error.message);\n  }\n}\n\n\n//# sourceURL=webpack://odin-project-weather-app/./src/index.js?");

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
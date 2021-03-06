// 'use strict'; 

const axios = require('axios');
const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;


// async function fetchWeatherData (lat, lon) {
//     let WeatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_KEY}`)
//     return WeatherData.data.data.map(day => new Forecast(day));
// }
// function Forecast(day) {
//     this.date = day.datetime;
//     this.description = `Today we have a low of ${day.low_temp} and a high of ${day.high_temp}, with ${day.weather.description}`; 
// }


// module.exports = { 
//     fetchWeatherData: fetchWeatherData,
//     forecast: Forecast
// }
'use strict';

let cache = require('./cache.js');



function getWeather(lat, lon) {
    const key = 'weather-' + lat + lon;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.body));
    }
    return cache[key].data;
}

function parseWeather(weatherData) {
    try {
    const weatherSummaries = weatherData.data.map(day => {
        return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
    } catch (e) {
    return Promise.reject(e);
    }
}

class Weather {
    constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
    }
}

module.exports = getWeather;


// module.exports = { 
//     fetchWeatherData: fetchWeatherData,
//     forecast: Forecast
// }
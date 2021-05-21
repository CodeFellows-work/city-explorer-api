'use strict'; 

const axios = require('axios');
const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
// const apiCall = require('../apiCall');
// const app = express();
// const express = require('express');

async function fetchWeatherData (lat, lon) {
    let WeatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_KEY}`)
    return WeatherData.data.data.map(day => new Forecast(day));
}
function Forecast(day) {
    this.date = day.datetime;
    this.description = `Today we have a low of ${day.low_temp} and a high of ${day.high_temp}, with ${day.weather.description}`; 
}


module.exports = { 
    fetchWeatherData: fetchWeatherData,
    forecast: Forecast
}
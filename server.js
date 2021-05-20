'use strict';

require('dotenv').config(); 
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const { request } = require('express');
// const weather = require('./data/weather.json');
// const { request } = require('express');

const app = express(); 



//
const PORT = process.env.PORT; 
const API_KEY = process.env.REACT_APP_API_KEY; 
const WEATHER_KEY = process.env.API_APP_WEATHER_KEY;
// class Forecast {
//     constructor(date, description){
//         this.date=date; 
//         this.description=description; 
//     }
// }


// function searchWeather(data, searchQuery) {
//     console.log(searchQuery); 
//     let weather = data.find(valid_date, description)
//     let results = weather.map(forcast => {
//         return new Forecast(forcast.valid_date, forcast.weather.description);
//     });
//     return results; 
// }
// handleFunction = (e) => {
//     axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`)
//         .then(response => {
//             let location = response.data[0]; 
//             this.setState({
//                 location: location,
//                 map: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=15`,
//                 //weather: `http://localhost3000/weather?lat=${location.lat}&lon=${location.lon}&query=${this.state.search}`
//             })
//         })
//         .catch(error => {console.log("Error, can not be displayed")})
//     }
// handleRegion2 = (e) => {
//     axios.get(`https://eu1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.search}&format=json`)
//         .then(response => {
//             let location = response.data[0]; 
//             this.setState({
//                 location: location,
//                 map: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=15`,
//                 //weather: `http://localhost3000/weather?lat=${location.lat}&lon=${location.lon}&query=${this.state.search}`
//             })
//         })
//         .catch(error => {console.log("Error, can not be displayed")})
//     }
// app.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&lat=${weather.lat}lon=${weather.lon}`, (request, response) => {
//     let result = searchWeather(weather, request.query);
//     response.status(200).send(result); 
// })
async function fetchLocationData (searchQuery) {
    let LocationData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`);
    return LocationData.data[0];
}

async function fetchMap (lat, lon) {
    let MapData = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lon}&zoom=15`)
    return MapData.data[0]; 
}
async function fetchWeather(searchQuery) {
    let Weather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&q=${searchQuery}&city=${searchQuery}`)
    return Weather.data[0]; 
}
app.use(cors());



app.get('/location', async (request, response) => {
    let searchQuery = request.query.search; 
    let locationData = await fetchLocationData(searchQuery); 
    
    response.json(locationData);

});
app.get('/weather', async (request, response) => {
    let searchQuery = request.query.search; 
    let weatherData = await fetchWeather(searchQuery);
    response.json(weatherData); 
})

// app.get('/weather', async (request, response) => {
//     let 
// })


app.get('*', (request, response) => {
    response.status(500).send('Uh oh... Something went wrong');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

'use strict';

require('dotenv').config(); 
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const PORT = process.env.PORT; 



const app = express(); 
app.use(cors());

const movie = require('./lib/movies/fetchMovie.js');
const weather = require('./lib/weather/fetchWeatherData.js');
const location = require('./lib/location/fetchLocationData.js'); 
const map =require('./lib/map/fetchMap.js');

// async function fetchLocationData (searchQuery) {
//     let url = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`
//     let LocationData = await axios.get(url);
//     return LocationData.data;
// }
app.get('/movie', async(request, response) => {
    let query = request.query.query
    let movieData = await movie.fetchMovie(query);
    response.json(movieData); 
})
app.get('/map', async (request, response) => {
    let lat = request.query.lat
    let lon = request.query.lon
    let mapData = await map.fetchMap(lat, lon); 
    response.send(mapData); 
})
app.get('/location', async (request, response) => {
    let searchQuery = request.query.search; 
    let locationData = await location.fetchLocationData(searchQuery); 
    response.send(locationData);
});
app.get('/weather', async (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    console.log(lat, lon); 
    let weatherData = await weather.fetchWeatherData(lat, lon);
    response.send(weatherData);
});
app.get('*', (request, response) => {
    response.status(500).send('Uh oh... Something went wrong');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

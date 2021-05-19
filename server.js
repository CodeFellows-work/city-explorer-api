'use strict';

const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3000; 


// app.get('/', (request, response) => {
//     response.send('hello from the home route!');
// });

app.get('/weather&lat=${weather.lat}&lon=${weather.lon}&searchQuery=${weather.city_name}', (request, response) => {
    response.status(200).send(weather);
});

app.get('*', (request, response) => {
    response.status(404).send('not found');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

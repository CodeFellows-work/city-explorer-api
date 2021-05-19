'use strict';

const express = require('express'); 
require('dotenv').config(); 
const cors = require('cors');
const weather = require('./data/weather.json');
const { request } = require('express');

const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3000; 


// app.get('/', (request, response) => {
//     response.send('hello from the home route!');
// });

app.get(`/weather?`, (request, response) => {
    response.status(200).send(weather);
});

app.get('*', (request, response) => {
    response.status(500).send('Uh oh... Something went wrong');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

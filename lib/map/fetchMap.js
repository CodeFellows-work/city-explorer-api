'use strict'

const axios = require('axios'); 
const { request } = require('express');
const API_KEY = process.env.REACT_APP_API_KEY; 
const express = require('express')
const cors = require('cors')
const app = express(); 
app.use(cors()); 

async function fetchMap (lat, lon) {
    let mapData = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lon}&zoom=15`)
    return mapData.data; 
}


module.exports = {fetchMap}
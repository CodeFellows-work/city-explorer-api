'use strict'

const axios = require('axios'); 
const API_KEY = process.env.REACT_APP_API_KEY; 

async function fetchMap (lat, lon) {
    let mapData = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lon}&zoom=15`)
    return mapData.data; 
}


module.exports = {fetchMap}
'use strict'; 

const axios = require('axios'); 
const MOVIE_KEY = process.env.REACT_APP_MOVIE_KEY; 

async function fetchMovie (search) {
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie/550?api_key=${MOVIE_KEY}&query=${search}`)
    return movieData.data; 
}

module.exports = {fetchMovie}; 
'use strict'; 

const axios = require('axios'); 
const { query } = require('express');
const MOVIE_KEY = process.env.REACT_APP_MOVIE_KEY; 

async function fetchMovie (query) {
    let tMDb = await axios.get(`http://api.themoviedb.org/3/search/movie?query=${query}&api_key=${MOVIE_KEY}`)
    return tMDb.data.results.map(item => new Movie(item)); 
}
function Movie(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.poster = item.poster_path;
}


module.exports = {
    fetchMovie : fetchMovie, 
    movie: Movie
}; 
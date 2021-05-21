'use strict';
const axios = require('axios');

async function apiCall(url, handleError) {
    try {
    let result = axios.get(url);
    return result.data;
    } catch (e) {
    handleError(e);
    }
}

module.exports = apiCall;
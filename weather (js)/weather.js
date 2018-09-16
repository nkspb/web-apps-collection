const https = require("https");
const http = require("http"); // for status codes
const api = require("./api.json");

// Function for printing errors
function printError(error) {
    console.error(error.message);
}

// Function for printing weather
function printWeather(weather, city) {
    console.log(`Current temperature in ${city} is ${weather.currently.temperature}F`);
}

// Get coordinates from zip code
function getWeather(zipCode) {
    const params = {
        "key": api.zipcodeapi
    }
    const url = `https://www.zipcodeapi.com/rest/${params.key}/info.json/${zipCode}/degrees`;
    try { // Check if url is malformed
        const req = https.get(url, res => {
            if (res.statusCode === 200) {
                let body = "";
                // Data arrives in chunks
                res.on("data", chunk => {
                    body += chunk;
                });
                res.on("end", data => {
                    try {
                    body = JSON.parse(body);   
                    // Populate coordinates array, it will be used when requesting weather
                    getWeatherInfo(body.lat, body.lng, body.city);
                    } catch (error) {
                        printError(error);
                    }
                });
                
            } else {
                // Status code error
                const statusCodeError = new Error(`There was an error getting the message for zip code ${zipCode}. (${http.STATUS_CODES[res.statusCode]})`);
                printError(statusCodeError);
            }
        });
    } catch(error) {
        // Malformed URL
        printError(error);        
    }
}

function getWeatherInfo(lat, lng, city) {
    const params = {
        "key": api.forecastio
    }
    const url = `https://api.darksky.net/forecast/${params.key}/${lat},${lng}`;
    try { // check if URL is malformed
        const request = https.get(url, res => {
            if (res.statusCode === 200) { // check status code error
                let body = "";
                res.on("data", chunk => {
                    body += chunk;
                });
                res.on("end", data => {
                    try {
                        body = JSON.parse(body);
                        printWeather(body, city);
                    } catch (error) {
                        // Parse error
                        printError(error);
                    }
                });
            } else {
                // Status code error
                const statusCodeError = new Error(`There was an error getting weather for ${city}`);
                printError(statusCodeError);
            }
        });
    } catch (error) {
        // Malformed URL
        printError(error);
    }
}

module.exports.getWeather = getWeather;


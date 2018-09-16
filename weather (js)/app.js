const weather = require("./weather");
// Get zip code from second argument
const zipCode = process.argv[2];
// Find the weather
weather.getWeather(zipCode);



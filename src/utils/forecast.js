const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/fb46e9a143fb75db41133f43b3bba937/${latitude},${longitude}?units=si&lang=en`;

  request(
    {
      url,
      json: true
    },
    (error, { body: response }) => {
      if (error) {
        callback("Unable to connect to wheater services", undefined);
      } else if (response.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(
          undefined,
          `
${response.daily.data[0].summary}
It is currently ${response.currently.temperature} degrees out.
There is a ${response.currently.precipProbability}% chance of rain.
There is a min of ${response.daily.data[0].temperatureMin} and a max of ${response.daily.data[0].temperatureMax}
        `
        );
      }
    }
  );
};

module.exports = forecast;

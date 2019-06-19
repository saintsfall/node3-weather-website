const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FpbnRzZmFsbCIsImEiOiJjangwbzQ0MXgwMTFyNDRzNWM1ZDRlNnplIn0.QPWpsd14Wt7hL-hXy1swNg&limit=1";

  request(
    {
      url,
      json: true
    },
    (error, { body: response }) => {
      if (error) {
        callback("Unable to connect to location services.", undefined);
      } else if (response.features.length === 0) {
        callback("Unable to find location. Review your search.", undefined);
      } else {
        callback(undefined, {
          latitude: response.features[0].center[1],
          longitude: response.features[0].center[0],
          location: response.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;

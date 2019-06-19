const path = require("path");
const express = require("express");
const request = require("request");
const hbs = require("hbs");

const app = express();

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Paths for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

// Handlebars setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Caio Santos"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Caio Santos"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Caio Santos",
    message: "Here comes some important info"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An address must be provided"
    });
  }
  const location = req.query.address;

  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "A search term must be provided"
    });
  }

  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 | Help",
    message: "Help article not found",
    name: "Caio Santos"
  });
});

// The order matters for 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found.",
    name: "Caio Santos"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

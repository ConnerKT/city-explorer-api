"use strict";
// Require (imports) for our libraries and dependencies
require("dotenv").config();
const cors = require("cors");// This allows cross origin request
const express = require("express");// Adding express allows us to make web applications with ease
const app = express(); // We set express to a variable so we can utilize the HTTP verbs
const axios = require('axios'); //Important axios so we can access the data from the API
const port = 3001; //Defining our PORT
const weather = require("./Modules/Weather")
const movies = require("./Modules/Movies.js")
app.use(cors()); // We use CORS here

// Setting the default endpoint to send 
app.get("/", (req, res) => {
  res.send(`🔴 We're currently live on the Port ${port}✨`);
});

// Our http get is below for the endpoint of weather
app.get("/weather", weather.weather)
app.get("/movies", movies.movies)
// This is an endpoint for any other endpoint that is not declared, which returns an "Not Found" text
app.get("*", (request, response) => {
  response.status(404).send("not found");
});
//This is a listen on our port, so we can know when its running
app.listen(port, () => {
  console.log(`🔥 We're live on ${port} 🔥`);
});




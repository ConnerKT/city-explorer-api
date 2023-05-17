"use strict";
// Require (imports) for our libraries and dependencies
require("dotenv").config();
const cors = require("cors");// This allows cross origin request
const express = require("express");// Adding express allows us to make web applications with ease
const app = express(); // We set express to a variable so we can utilize the HTTP verbs
const weatherdata = require("./data/weather.json"); //Adding our data for our API
const axios = require('axios'); //Importint axios so we can access the data from the API
const port = 3001; //Defining our PORT
app.use(cors()); // We use CORS here


//Grabbing data from the API to send to our endpoints
const getWeather = async (searchQuery,longitudeQuery,latitudeQuery) => {
  try{
    let url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${latitudeQuery}&lon=${longitudeQuery}&city=${searchQuery}`
    let response = await axios.get(url);
    return response.data
  }catch(error){
    console.log(error)
  }
  
}

// Setting the default endpoint to send 
app.get("/", (req, res) => {
  res.send(`🔴 We're currently live on the Port ${port}✨`);
});
// Our http get is below for the endpoint of weather
app.get("/weather", async (req, res) => {
  
    //Here we set the query for the endpoint 
  let searchQuery = req.query.searchQuery;
  let longitudeQuery = req.query.longitudeQuery;
  let latitudeQuery = req.query.latitudeQuery;

  let Weatherdata= await getWeather(searchQuery,longitudeQuery,latitudeQuery);
  console.log(Weatherdata)
  //We use .find to go through our array of data and see if any of the querys are contained
  let searchQueryBoolean = weatherdata.find((value) => {
    if (
      searchQuery == value.city_name ||
      value.lat == latitudeQuery ||
      value.lon == longitudeQuery
    ) {
        //Return true if its appears
      return true;
    } else {
        //Return false if it doesn't
      return false;
    }
  });
  //We declare a new Array and map through the array above, we use a class to create new objects for this array
  let newArr = searchQueryBoolean.data.map((element, index) => {
    //it contains all the info we need for the current selected element
    let cityname = searchQueryBoolean.city_name;
    let date = new Date(element.datetime);
    let description = element.weather.description;
    let lowtemp = element.low_temp;
    let hightemp = element.high_temp;
    let day = index + 1;
    let lat = searchQueryBoolean.lat;
    let lon = searchQueryBoolean.lon;
    //We set the new forecast(class) to forecast1, and input forecast1 into our array
    const Forecast1 = new Forecast(
      cityname,
      day,
      date,
      description,
      lowtemp,
      hightemp,
      lat,
      lon
    );
    return Forecast1;
  });
  //If our searchQuery is empty, return an error
  if (searchQuery == undefined) {
    res
      .status(500)
      .send("ERROR please input a city name, latitude, or longitude");
  }
  //If our searchQueryBoolean is true, we want to send the data
  if (searchQueryBoolean) {
    res.send(newArr);
  } else {
    //If not we return an empty array
    return [];
  }
});
// This is an endpoint for any other endpoint that is not declared, which returns an "Not Found" text
app.get("*", (request, response) => {
  response.status(404).send("not found");
});
//This is a listen on our port, so we can know when its running
app.listen(port, () => {
  console.log(`🔥 We're live on ${port} 🔥`);
});
//We declare a class here with a constructor function, so we can create a new forecast with these properties
class Forecast {
  constructor(cityname, day, date, description, lowtemp, hightemp, lat, lon) {
    this.cityname = cityname;
    this.day = day;
    this.date = date;
    this.description = description;
    this.lowtemp = lowtemp;
    this.hightemp = hightemp;
    this.lat = lat;
    this.long = lon;
  }
}

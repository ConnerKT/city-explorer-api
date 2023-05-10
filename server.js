'use strict'
// Require (imports) for our libraries and dependencies
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const weatherdata = require("./data/weather.json");
const port = 3001;
app.use(cors());

app.get('/', (req, res) => {
    res.send(`🔴 We're currently live on the Port ${port}✨`)
})
// Our http get is below for the endpoint of weather
app.get('/weather',(req, res) => {
    let searchQuery = req.query.searchQuery;
    let longitudeQuery = req.query.longitudeQuery;
    let latitudeQuery = req.query.latitudeQuery;
    // We set the data for each location into an array
    // let seattleData = {
    //     name:weatherdata[0].city_name,
    //     longitude:weatherdata[0].lon,
    //     latitude:weatherdata[0].lat
    // }
    // let parisData = {
    //     name:weatherdata[1].city_name,
    //     longitude:weatherdata[1].lon,
    //     latitude:weatherdata[1].lat
    // }
    // let ammanData = {
    //     name:weatherdata[2].city_name,
    //     longitude:weatherdata[2].lon,
    //     latitude:weatherdata[2].lat
    // }
    // let allLocationData = [seattleData,parisData,ammanData];
    let searchQueryBoolean = weatherdata.find(value => {
        if (searchQuery == value.city_name || value.lat == latitudeQuery || value.lon == longitudeQuery){
            res.send("WORKS WORKS")
            return true;
        }else {
            return false
        }
    });
    let newArr = searchQueryBoolean.data.map(element => {
        let date = new Date(element.datetime)
        const Forecast1 = new Forecast(date)
        return Forecast1
    })
    console.log(newArr)
    if (searchQuery == undefined){
        res.status(400).send("ERROR please input a city name, latitude, or longitude")
    }
});
// This is an endpoint for any other endpoint that is not declared, which returns an "Not Found" text
app.get('*', (request, response) => {
    response.status(404).send('not found')
});
app.listen(port, () => {
    console.log(`🔥 We're live on ${port} 🔥`)
})
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

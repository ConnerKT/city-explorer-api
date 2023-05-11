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
            return true;
        }else {
            return false
        }
    });
    let newArr = searchQueryBoolean.data.map((element, index) => {
        let date = new Date(element.datetime);
        let description = element.weather.description;
        let lowtemp = element.low_temp;
        let hightemp = element.high_temp;
        let day = index + 1
        const Forecast1 = new Forecast(day, date, description, lowtemp, hightemp);
        return Forecast1
    })
    if (searchQuery == undefined){
        res.status(400).send("ERROR please input a city name, latitude, or longitude")
    }
    if (searchQueryBoolean){
        res.send(newArr);
    }else{
        return [];
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
    constructor(day,date, description, lowtemp, hightemp) {
        this.day = day;
        this.date = date;
        this.description = description;
        this.lowtemp = lowtemp;
        this.hightemp = hightemp;
    }
}

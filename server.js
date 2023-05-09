'use strict'
// Require (imports) for our libraries and dependencies
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const weatherdata = require("./data/weather.json");
const port = 3001;
app.use(cors());

// Our http get is below
app.get('/weather',(req, res) => {
    let searchQuery = 'Seattle';
    let longitudeQuery = req.query.longitudeQuery;
    let latitudeQuery = req.query.latitudeQuery;
    
    let seattleData = {
        name:weatherdata[0].city_name,
        longitude:weatherdata[0].lon,
        latitude:weatherdata[0].lat
    }
    let parisData = {
        name:weatherdata[1].city_name,
        longitude:weatherdata[1].lon,
        latitude:weatherdata[1].lat
    }
    let ammanData = {
        name:weatherdata[2].city_name,
        longitude:weatherdata[2].lon,
        latitude:weatherdata[2].lat
    }
    let allLocationData = [seattleData,parisData,ammanData];
    weatherdata.find(value => value.city_name === searchQuery);

    
    
});

app.listen(port, () => {
    console.log(`🔥 We're live on ${port} 🔥`)
})
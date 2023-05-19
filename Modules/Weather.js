const axios = require('axios'); //Important axios so we can access the data from the API

exports.weather = async function(req, res){
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
  const getWeather = async (searchQuery,longitudeQuery,latitudeQuery) => {
    try{
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}`
      let response = await axios.get(url);
      return response.data
    }catch(error){
      console.log(error)
    }
  }
//Here we set the query for the endpoint 
  let searchQuery = req.query.searchQuery;
  let longitudeQuery = req.query.longitudeQuery;
  let latitudeQuery = req.query.latitudeQuery;

  let Weatherdata= await getWeather(searchQuery,longitudeQuery,latitudeQuery);
  //We declare a new Array and map through the array above, we use a class to create new objects for this array
  let newArr = Weatherdata.data.map((element, index) => {
    //it contains all the info we need for the current selected element
    let cityname = Weatherdata.city_name;
    let date = new Date(element.datetime);
    let description = element.weather.description;
    let lowtemp = element.low_temp;
    let hightemp = element.high_temp;
    let day = index + 1;
    let lat = Weatherdata.lat;
    let lon = Weatherdata.lon;
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
res.send(newArr)
}
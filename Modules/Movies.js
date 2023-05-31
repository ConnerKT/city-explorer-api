const axios = require('axios'); //Important axios so we can access the data from the API
const NodeCache = require ("node-cache")// We are using a library called NodeCache to help cache our incoming data

//This is where you let our library node-cache be used in our code, by setting it here.
const cache = new NodeCache();
//We export our movie module so we can use it in server
exports.movies = async function(request, response){

    const getMovie = async (movieQuery) => {
        try{
          let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieQuery}`
        const cachedData = cache.get(url);
        if (cachedData) {
          //This is a conditional return if our data is cached
          return cachedData;
      }
          let response = await axios.get(url);
          cache.set(url, response.data, 5000);
          return response.data
        }catch(error){
          //Error Handling for the response
        console.log(error)
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
      }
      // Our movie class constructor
      class Movie {
        constructor(title, overview, average_votes, total_votes, poster_path, popularity, release_date){
          this.title = title;
          this.overview = overview;
          this.average_votes = average_votes;
          this.total_votes = total_votes;
          this.poster_path = poster_path;
          this.popularity = popularity
          this.release_date = release_date;
        }
      }

      let movieQuery = request.query.movieQuery;
      let movieData= await getMovie(movieQuery);
      // response.send(movieData)
      console.log(movieData.results)
      let newArr = movieData.results.map((element) => {
        //it contains all the info we need for the current selected element
        let title = element.title;
        let overview = element.overview;
        let average_votes = element.average_votes;
        let total_votes = element.total_votes;
        let poster_path = element.poster_path;
        let popularity = element.popularity;
        let release_date = element.release_date;
        //We set the new forecast(class) to forecast1, and input forecast1 into our array
        const Movie1 = new Movie(title, overview, average_votes, total_votes, poster_path, popularity, release_date);
        return Movie1;
      });
      if (movieQuery === undefined){
          res.status(500).send("Please input something!");
      
      }
      response.send(newArr)


}
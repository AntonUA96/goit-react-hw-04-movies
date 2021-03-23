import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const KEY = '17748166fe59cedb6c7b855a403e9f75';

const getTrending = () => axios.get(`${URL}/trending/movie/day?api_key=${KEY}`);

const searchMovies = (query = '') =>
  axios.get(
    `${URL}/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );

const getMovieDetails = id =>
  axios.get(`${URL}/movie/${id}?api_key=${KEY}&language=en-US`);

const getMovieCast = id =>
  axios.get(`${URL}/movie/${id}/credits?api_key=${KEY}`);

const getMovieReviews = id =>
  axios.get(`${URL}/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`);
export default {
  getTrending,
  searchMovies,
  getMovieDetails,
  getMovieCast,
  getMovieReviews,
};

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'a907caf8c46067564d1786718be1cb84';
const page = 1;
const totalMovies = 12;
const query = '';
// const url = `${BASE_URL}movie/550?api_key=${API_KEY}&callback=test`;
// const url = `${BASE_URL}trending/movie/all/day?api_key=${API_KEY}`;

// const trending = 'trending/movie/day';
async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrending() {
  // console.log(fetchMovies(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`));
  return fetchMovies(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
}

export function fetchMoviesSearch(query) {
  console.log('query', query);
  return fetchMovies(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}
`);
}

export function fetchMovieDetails(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCast(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movie_id) {
  return fetchMovies(
    `${BASE_URL}movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import * as MoviesSearchAPI from '../../services/movies-api';

import Searchbar from '../Searchbar';
import Loader from '../Loader';
import MoviesList from '../MoviesList/';

const MoviesPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  console.log(location);
  const queryLocation = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    MoviesSearchAPI.fetchMoviesSearch(query)
      .then(data => {
        if (data.results.length === 0) {
          return toast.error(`Invalid request name ${query}. Please try again`);
        }
        setMovies(data.results);
      })
      .catch(error => {
        setError(error);
      })
      .finally(setIsLoading(false));
  }, [query]);

  useEffect(() => {
    location.search !== '' &&
      MoviesSearchAPI.fetchMoviesSearch(queryLocation)
        .then(data => setMovies(data.results))
        .catch(error => {
          setError(error);
        });
  }, [location.search, queryLocation]);

  const handleFormSubmit = query => {
    setQuery(query);
    setMovies(movies);
    location.search = `query=${query}`;
  };

  return (
    <>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2000} position="top-center" />
      {isLoading && <Loader />}
      <MoviesList movies={movies} location={location} />
      {error && <p>Something wrong</p>}
    </>
  );
};

MoviesPage.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  query: PropTypes.string,
};

export default MoviesPage;

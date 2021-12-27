import { useState, useEffect } from 'react';
import * as TrendingAPI from '../../services/movies-api';
import { useRouteMatch, useLocation } from 'react-router-dom';
import MoviesList from '../MoviesList/';

import styles from './HomePage.module.css';

const HomePage = () => {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  console.log(url);
  console.log(location);

  useEffect(() => {
    TrendingAPI.fetchTrending()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      <MoviesList movies={movies} location={location} />
      {error && <p>Something wrong</p>}
    </>
  );
};

export default HomePage;

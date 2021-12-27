import { useState, useEffect } from 'react';
import * as TrendingAPI from '../../services/movies-api';
import { useRouteMatch } from 'react-router-dom';
import MoviesList from '../MoviesList/';

import styles from './HomePage.module.css';

console.log(TrendingAPI);
const HomePage = () => {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  console.log(url);

  useEffect(() => {
    TrendingAPI.fetchTrending().then(data => {
      setMovies(data.results);
    });
  }, []);

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      <MoviesList movies={movies} />
    </>
  );
};

export default HomePage;

import { useState, useEffect } from 'react';
import * as TrendingAPI from '../../services/movies-api';
import { Link, useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';

import styles from './HomePage.module.css';

console.log(TrendingAPI);
const HomePage = () => {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  console.log(url);

  useEffect(() => {
    TrendingAPI.fetchTrending().then(setMovies);
  }, []);

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      <ul className={styles.list}>
        {movies &&
          movies.results.map(({ id, title, poster_path, original_title }) => (
            <li className={styles.item} key={id}>
              <Link to={`/movies/${id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title ? title : original_title}
                ></img>
                <p>{title ? title : original_title}</p>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default HomePage;

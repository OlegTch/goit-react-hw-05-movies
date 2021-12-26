import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as MoviesSearchAPI from '../../services/movies-api';

import Searchbar from '../Searchbar';
import Loader from '../Loader';
import styles from './MoviesPage.module.css';

const MoviesPage = query => {
  const [movies, setMovies] = useState('');

  useEffect(() => {
    MoviesSearchAPI.fetchMoviesSearch().then(setMovies);
  }, []);

  const handleFormSubmit = searchQuery => {
    setMovies(searchQuery);
  };

  return (
    <>
      <p className={styles.text}>MoviesPage</p>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2000} position="top-center" />
      {/* {searchMovies && <>} */}
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
export default MoviesPage;

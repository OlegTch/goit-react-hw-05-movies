import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch, Route } from 'react-router-dom';
import * as MovieDetailsAPI from '../../services/movies-api';
import PropTypes from 'prop-types';

import Cast from '../Cast';
import Reviews from '../Reviews';

import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const { url, path } = useRouteMatch();
  console.log(url);
  console.log(path);

  useEffect(() => {
    MovieDetailsAPI.fetchMovieDetails(movieId).then(setMovies);
    console.log(movieId);
  }, [movieId]);

  console.log(movies);

  return (
    <>
      <button>GO BACK</button>
      <p>{movieId}</p>
      {movies && (
        <div className={styles.text}>
          MovieDetailsPage
          <img
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            alt={movies.title ? movies.title : movies.original_title}
          ></img>
          <h2>{movies.title ? movies.title : movies.original_title}</h2>
          <p>User score: {movies.vote_average}</p>
          <h3>Overview</h3>
          <p>{movies.overview}</p>
          <h3>Genres</h3>
          <ul className={styles.list}>
            {movies.genres.map(genre => (
              <li key={genre.id} className={styles.item}>
                {genre.name}
              </li>
            ))}
          </ul>
          <hr />
          <p>Additional information</p>
          <NavLink
            // to="/movies/:movieId/cast"
            to={`${url}/cast`}
            className={styles.link}
            // activeClassName={styles.activeLink}
          >
            Cast
          </NavLink>
          <NavLink
            // to="/movies/:movieId/reviews"
            to={`${url}/reviews`}
            className={styles.link}
            // activeClassName={styles.activeLink}
          >
            Reviews
          </NavLink>
          <Route path={`${path}/cast`}>
            <Cast movies={movies} movieId={movieId} />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews movies={movies} movieId={movieId} />
          </Route>
        </div>
      )}
    </>
  );
};

MovieDetailsPage.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieDetailsPage;

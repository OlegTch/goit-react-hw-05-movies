import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch, Route } from 'react-router-dom';
import * as MovieDetailsAPI from '../../services/movies-api';
import PropTypes from 'prop-types';
import noImageMovie from '../../images/noImageMovie.jpg';

import Cast from '../Cast';
import Reviews from '../Reviews';

import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const { url, path } = useRouteMatch();
  console.log('url', url);
  console.log('path', path);

  useEffect(() => {
    MovieDetailsAPI.fetchMovieDetails(movieId).then(setMovies);
  }, [movieId]);

  return (
    <>
      <button>GO BACK</button>
      {movies && (
        <div className={styles.thumb}>
          <div className={styles.imageThumb}>
            <img
              className={styles.image}
              src={
                movies.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movies.poster_path}`
                  : noImageMovie
              }
              alt={movies.title ? movies.title : movies.original_title}
            ></img>
            <div className={styles.descriptionThumb}>
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
            </div>
          </div>
          <hr />
          <p>Additional information</p>
          <NavLink
            to={`${url}/cast`}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Cast
          </NavLink>
          <NavLink
            to={`${url}/reviews`}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Reviews
          </NavLink>
        </div>
      )}

      <Route path={`${path}/cast`}>
        <Cast movies={movies} movieId={movieId} />
      </Route>
      <Route path={`${path}/reviews`}>
        <Reviews movies={movies} movieId={movieId} />
      </Route>
    </>
  );
};

MovieDetailsPage.propTypes = {
  movieId: PropTypes.number,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      genre: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, item: PropTypes.string }),
      ),
      original_title: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  ),
};

export default MovieDetailsPage;

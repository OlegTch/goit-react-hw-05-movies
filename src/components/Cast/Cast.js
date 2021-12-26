import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MovieCastAPI from '../../services/movies-api';
// import PropTypes from 'prop-types';
import styles from './Cast.module.css';

//  fetchMovieCast
const Cast = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    MovieCastAPI.fetchMovieCast(movieId).then(setMovies);
  }, [movieId]);

  return (
    <>
      {movies && (
        <ul className={styles.list}>
          {movies.cast.map(({ id, name, character, profile_path }) => (
            <li className={styles.item} key={id}>
              <img src={profile_path} alt={name}></img>
              <h4>{name}</h4>
              <p>character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;

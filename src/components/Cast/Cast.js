import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MovieCastAPI from '../../services/movies-api';
import noImage from '../../images/noImage.jpg';
import PropTypes from 'prop-types';
import styles from './Cast.module.css';

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
              <div className={styles.thumb}>
                <img
                  className={styles.image}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : noImage
                  }
                  alt={name}
                ></img>
                <h4 className={styles.title}>{name}</h4>
                {character && (
                  <p className={styles.text}>character: {character}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

Cast.propTypes = {
  movies: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.string,
  character: PropTypes.string,
  profile_path: PropTypes.string,
};
export default Cast;

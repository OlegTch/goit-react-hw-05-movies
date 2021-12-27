import noImageMovie from '../../images/noImageMovie.jpg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MoviesList.module.css';
// import { useLocation } from 'react-router-dom';

const MoviesList = ({ movies, location, locationHome }) => {
  return (
    <ul className={styles.list}>
      {movies &&
        movies.map(({ id, title, poster_path, original_title }) => (
          <li className={styles.item} key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : noImageMovie
                }
                alt={title ? title : original_title}
              ></img>
              <p className={styles.text}>{title ? title : original_title}</p>
            </Link>
          </li>
        ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      original_title: PropTypes.string,
    }),
  ),
  location: PropTypes.object,
};

export default MoviesList;

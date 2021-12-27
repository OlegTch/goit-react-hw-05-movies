import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as MovieReviewsAPI from '../../services/movies-api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    MovieReviewsAPI.fetchMovieReviews(movieId).then(data => {
      setMovie(data.results);
    });
  }, [movieId]);

  return (
    <>
      {movie &&
        (movie.length ? (
          <ul className={styles.list}>
            {movie.map(({ id, author, content }) => (
              <li className={styles.item} key={id}>
                <h4>{author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don't have any reviews for this movie</p>
        ))}
    </>
  );
};

Reviews.propTypes = {
  movies: PropTypes.object,
  id: PropTypes.number,
  author: PropTypes.string,
  content: PropTypes.string,
};

export default Reviews;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as MovieReviewsAPI from '../../services/movies-api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    MovieReviewsAPI.fetchMovieReviews(movieId).then(setMovie);
  }, [movieId]);

  console.log(useParams());
  return (
    <>
      {movie && (
        <ul className={styles.list}>
          {movie.results.map(({ id, author, content }) => (
            <li className={styles.item} key={id}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;

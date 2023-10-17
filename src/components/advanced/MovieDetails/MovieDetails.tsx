import React from 'react';
import { Movie } from '../../../models/Movie';
import styles from './MovieDetails.module.scss';
import { toHoursAndMinutes } from '../../../utils/DateUtils';

interface MovieDetailsProps {
  movie: Movie;
}

function MovieDetails({movie}: MovieDetailsProps) {
  return (
    <div className={styles.movieDetails} data-testid="movie-details">
      <img className={styles.movieDetails__image} src={movie.posterUrl} alt=""/>
      <div>
        <div className="d-flex">
          <h3 className={styles.movieDetails__title}>{movie.title}</h3>
          <div className={styles.movieDetails__rating}>{movie.rating}</div>
        </div>
        <div className={styles.movieDetails__genres}>{movie.genres.join(', ')}</div>
        <div className="my-2">
          <span className={styles.movieDetails__date}>{movie.releaseDate}</span>
          <span className={styles.movieDetails__duration}>{toHoursAndMinutes(movie.duration)}</span>
        </div>
        <div className={styles.movieDetails__overview}>{movie.overview}</div>
      </div>
    </div>
  );
}

export default MovieDetails;

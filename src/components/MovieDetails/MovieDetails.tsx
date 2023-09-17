import React from 'react';
import { Movie } from '../../models/Movie';
import './MovieDetails.scss';

interface MovieDetailsProps {
  movie: Movie;
}

function MovieDetails({movie}: MovieDetailsProps) {
  const toHoursAndMinutes = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  return (
    <div className="movie-details d-flex">
      <img className="movie-details__image" src={movie.posterUrl} alt=""/>
      <div>
        <div className="d-flex">
          <h3 className="movie-details__title">{movie.title}</h3>
          <div className="movie-details__rating">{movie.rating}</div>
        </div>
        <div className="movie-details__genres">{movie.genres.join(', ')}</div>
        <div className="my-2">
          <span className="movie-details__date">{movie.releaseDate}</span>
          <span className="movie-details__duration">{toHoursAndMinutes(movie.duration)}</span>
        </div>
        <div className="movie-details__overview">{movie.overview}</div>
      </div>
    </div>
  );
}

export default MovieDetails;

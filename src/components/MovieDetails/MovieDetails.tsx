import React from 'react';
import './MovieDetails.scss';
import { MovieInfo } from '../MovieTile/MovieTile';

export interface MovieDetails extends MovieInfo {
  rating: number;
  duration: string;
  description: string;
}

interface MovieDetailsProps {
  movieDetails: MovieDetails;
}

function MovieDetails({movieDetails}: MovieDetailsProps) {
  return (
    <div className="movie-details d-flex">
      <img className="movie-details__image" src={movieDetails.imageUrl} alt=""/>
      <div>
        <div className="d-flex">
          <h3 className="movie-details__name">{movieDetails.name}</h3>
          <div className="movie-details__rating">{movieDetails.rating}</div>
        </div>
        <div className="movie-details__genres">{movieDetails.genres.join(', ')}</div>
        <div className="my-2">
          <span className="movie-details__year">{movieDetails.year}</span>
          <span className="movie-details__duration">{movieDetails.duration}</span>
        </div>
        <div className="movie-details__description">{movieDetails.description}</div>
      </div>
    </div>
  );
}

export default MovieDetails;

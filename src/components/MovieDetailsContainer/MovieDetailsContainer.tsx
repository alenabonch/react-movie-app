import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Movie } from '../../models/Movie';
import MovieDetails from '../MovieDetails/MovieDetails';

function MovieDetailsContainer() {
  const movie = useLoaderData() as Movie;

  return (
      <MovieDetails movie={movie}/>
  );
}

export default MovieDetailsContainer;

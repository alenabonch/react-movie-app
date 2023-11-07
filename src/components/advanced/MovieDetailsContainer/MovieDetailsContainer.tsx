import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Movie } from '../../../models/Movie';
import MovieDetails from '../MovieDetails/MovieDetails';

function MovieDetailsContainer() {
  const movie = useLoaderData() as Movie;

  return (
      <>
        <MovieDetails movie={movie}/>
        <Outlet/>
      </>
  );
}

export default MovieDetailsContainer;

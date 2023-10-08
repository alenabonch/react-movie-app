import React from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { Movie } from '../../models/Movie';
import MovieDetails from '../MovieDetails/MovieDetails';

function MovieDetailsContainer() {
  const movie = useLoaderData() as Movie;
  const contextData = useOutletContext();

  return (
      <>
        <MovieDetails movie={movie}/>
        <Outlet context={contextData}/>
      </>
  );
}

export default MovieDetailsContainer;

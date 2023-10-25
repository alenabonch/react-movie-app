import HeaderMovieDetails from '@components/advanced/HeaderMovieDetails/HeaderMovieDetails';
import MovieService from '@services/MovieService';
import React from 'react';

export default async function DetailsPage({params}: { params: { movieId: string } }) {
  const movie = await MovieService.getMovie(params.movieId);
  return (
      <HeaderMovieDetails movie={movie}/>
  );
}
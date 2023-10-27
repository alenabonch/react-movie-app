import EditMovieDialog from '@components/advanced/EditMovieDialog/EditMovieDialog';
import HeaderMovieDetails from '@components/advanced/HeaderMovieDetails/HeaderMovieDetails';
import MovieService from '@services/MovieService';
import React from 'react';

export default async function EditPage({params}: { params: { movieId: string } }) {
  const movie = await MovieService.getMovie(params.movieId);

  return (
      <>
        <HeaderMovieDetails movie={movie}/>
        <EditMovieDialog movie={movie}/>
      </>
  );
}

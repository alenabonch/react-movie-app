import EditMovieDialog from '@components/advanced/EditMovieDialog/EditMovieDialog';
import MovieService from '@services/MovieService';
import React from 'react';

export default async function EditPage({params}: { params: { movieId: string } }) {
  const movie = await MovieService.getMovie(params.movieId);

  return (
      <EditMovieDialog movie={movie}/>
  );
}

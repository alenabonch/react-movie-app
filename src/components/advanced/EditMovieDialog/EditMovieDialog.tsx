import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GENRES } from '../../../data/Genre';
import { useNavigateWithQuery } from '../../../hooks/useNavigateWithQuery';
import { AddOrUpdateMovieServerError, Movie } from '../../../models/Movie';
import { useUpdateMovieMutation } from '../../../services/MovieApi';
import { isAddOrUpdateMovieError } from '../../../utils/MovieUtils';
import Dialog from '../../common/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';


function EditMovieDialog() {
  const movie = useLoaderData() as Movie;
  const [updateMovie, {isLoading}] = useUpdateMovieMutation();
  const [serverError, setServerError] = useState<AddOrUpdateMovieServerError | null>(null);
  const {navigateWithQuery} = useNavigateWithQuery();

  const handleEditMovieSubmit = async (movie: Movie) => {
    try {
      const updatedMovie = await updateMovie(movie).unwrap()
      navigateWithQuery(`/${updatedMovie.id}`);
    } catch (err) {
      if (isAddOrUpdateMovieError(err)) {
        setServerError(err)
      }
    }
  }

  const handleDialogClose = () => {
    navigateWithQuery('/');
  }

  return (
      <Dialog title="Edit Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={movie} loading={isLoading} error={serverError} genres={GENRES} onSubmit={handleEditMovieSubmit}/>
      </Dialog>
  );
}

export default EditMovieDialog;

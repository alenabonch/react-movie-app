import React, { useState } from 'react';
import { GENRES } from '../../../data/Genre';
import { useNavigateWithQuery } from '../../../hooks/useNavigateWithQuery';
import { AddOrUpdateMovieServerError, MovieDraft } from '../../../models/Movie';
import { useAddMovieMutation } from '../../../services/MovieApi';
import { isAddOrUpdateMovieError } from '../../../utils/MovieUtils';
import Dialog from '../../common/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';


function AddMovieDialog() {
  const [addMovie, {isLoading}] = useAddMovieMutation();
  const [serverError, setServerError] = useState<AddOrUpdateMovieServerError | null>(null);
  const {navigateWithQuery} = useNavigateWithQuery();

  const handleAddMovieSubmit = async (movie: MovieDraft) => {
    try {
      const addedMovie = await addMovie(movie).unwrap()
      navigateWithQuery(`/${addedMovie.id}`);
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
      <Dialog title="Add Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={null} loading={isLoading} error={serverError} genres={GENRES} onSubmit={handleAddMovieSubmit}/>
      </Dialog>
  );
}

export default AddMovieDialog;

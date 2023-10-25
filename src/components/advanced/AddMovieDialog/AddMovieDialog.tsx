'use client'
import { GENRES } from '@data/Genre';
import { useFetch } from '@hooks/useFetch';
import { useNavigateWithQuery } from '@hooks/useNavigateWithQuery';
import { MovieDraft } from '@models/Movie';
import MovieService from '@services/MovieService';
import React, { useEffect, useState } from 'react';
import Dialog from '../../common/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface AddMovieDialogProps {
  handleDialogClose: () => void
}

function AddMovieDialog({handleDialogClose}: AddMovieDialogProps) {
  const {navigateWithQuery} = useNavigateWithQuery()
  const [movieDraft, setMovieDraft] = useState<MovieDraft>();

  const [createMovie, loading, error] = useFetch(async (cancelToken) => {
    return MovieService.createMovie(movieDraft as MovieDraft, cancelToken);
  });

  useEffect(() => {
    if (movieDraft) {
      createMovie().then((createdMovie) => {
        navigateWithQuery(`/${createdMovie.id}`);
        handleDialogClose();
      });
    }
  }, [movieDraft]);

  const handleAddMovieSubmit = async (movie: MovieDraft) => {
    setMovieDraft(movie);
  }


  return (
      <Dialog title="Add Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={null} loading={loading} error={error} genres={GENRES} onSubmit={handleAddMovieSubmit}/>
      </Dialog>
  );
}

export default AddMovieDialog;

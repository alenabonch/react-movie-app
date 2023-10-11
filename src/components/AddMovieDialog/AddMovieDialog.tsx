import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GENRES } from '../../data/Genre';
import { useFetch } from '../../hooks/useFetch';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import { MovieDraft } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface AddMovieDialogProps {
  onAdd: (movie: MovieDraft) => void;
}

function AddMovieDialog() {
  const {onAdd} = useOutletContext<AddMovieDialogProps>();
  const {navigateWithQuery} = useNavigateWithQuery()
  const [movieDraft, setMovieDraft] = useState<MovieDraft>();

  const [createMovie, loading, error, createdMovie] = useFetch(async (cancelToken) => {
    return MovieService.createMovie(movieDraft as MovieDraft, cancelToken);
  });

  useEffect(() => {
    if (movieDraft) {
      void createMovie();
    }
  }, [movieDraft]);

  useEffect(() => {
    if (createdMovie) {
      navigateWithQuery(`/${createdMovie.id}`);
      onAdd(createdMovie);
    }
  }, [createdMovie]);

  const handleAddMovieSubmit = async (movie: MovieDraft) => {
    setMovieDraft(movie);
  }

  const handleDialogClose = () => {
    navigateWithQuery('/');
  }

  return (
      <Dialog title="Add Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={null} loading={loading} error={error} genres={GENRES} onSubmit={handleAddMovieSubmit}/>
      </Dialog>
  );
}

export default AddMovieDialog;

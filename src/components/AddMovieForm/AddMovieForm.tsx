import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GENRES } from '../../data/Genre';
import { useFetch } from '../../hooks/useFetch';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import { MovieDraft } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface AddMovieFormProps {
  onAdd: (movie: MovieDraft) => void;
}

function AddMovieForm() {
  const {onAdd} = useOutletContext<AddMovieFormProps>();
  const {navigateWithQuery} = useNavigateWithQuery()
  const [movieDraft, setMovieDraft] = useState<MovieDraft>();

  const [createMovie, loading, error] = useFetch(async (cancelToken) => {
    if (movieDraft) {
      const createdMovie = await MovieService.createMovie(movieDraft, cancelToken);
      navigateWithQuery(`/${createdMovie.id}`);
      onAdd(createdMovie);
    }
  });

  useEffect(() => {
    void createMovie();
  }, [movieDraft]);

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

export default AddMovieForm;

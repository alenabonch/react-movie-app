import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../../data/Genre';
import { useFetch } from '../../hooks/useFetch';
import { MovieDraft } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

function AddMovieForm() {
  const navigate = useNavigate();
  const [movieDraft, setMovieDraft] = useState<MovieDraft | null>(null);

  const [createMovie, loading, error] = useFetch(async (cancelToken) => {
    if (movieDraft) {
      const createdMovie = await MovieService.createMovie(movieDraft, cancelToken);
      console.log('createdMovie', createdMovie);
      navigate(`/${createdMovie.id}`);
    }
  })

  useEffect(() => {
    void createMovie();
  }, [movieDraft]);

  const handleAddMovieSubmit = async (movie: MovieDraft) => {
    setMovieDraft(movie);
  }

  const handleDialogClose = () => {
    navigate('..');
  }

  return (
      <Dialog title="Add Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={null} loading={loading} error={error} genres={GENRES} onSubmit={handleAddMovieSubmit}/>
      </Dialog>
  );
}

export default AddMovieForm;

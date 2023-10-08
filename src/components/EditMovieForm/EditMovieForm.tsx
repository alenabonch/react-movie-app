import React, { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { GENRES } from '../../data/Genre';
import { useFetch } from '../../hooks/useFetch';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import { Movie } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

const mockedUseNavigateWithQuery = jest.fn();
jest.mock('../../hooks/useNavigateWithQuery', () => ({
  useNavigateWithQuery: () => ({navigateWithQuery: mockedUseNavigateWithQuery}),
}));

interface EditMovieFormProps {
  onEdit: (movie: Movie) => void;
}

function EditMovieForm() {
  const {onEdit} = useOutletContext<EditMovieFormProps>();
  const {navigateWithQuery} = useNavigateWithQuery()
  const movie = useLoaderData() as Movie;
  const [movieToUpdate, setMovieToUpdate] = useState<Movie>();

  const [updateMovie, loading, error] = useFetch(async (cancelToken) => {
    if (movieToUpdate) {
      const updatedMovie = await MovieService.updateMovie(movieToUpdate, cancelToken);
      navigateWithQuery(`/${updatedMovie.id}`);
      onEdit(updatedMovie);
    }
  })

  useEffect(() => {
    void updateMovie();
  }, [movieToUpdate]);

  const handleEditMovieSubmit = async (movie: Movie) => {
    setMovieToUpdate(movie);
  }

  const handleDialogClose = () => {
    navigateWithQuery('/');
  }

  return (
      <Dialog title="Edit Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={movie} loading={loading} error={error} genres={GENRES} onSubmit={handleEditMovieSubmit}/>
      </Dialog>
  );
}

export default EditMovieForm;

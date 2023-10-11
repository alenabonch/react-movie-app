import React, { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { GENRES } from '../../data/Genre';
import { useFetch } from '../../hooks/useFetch';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import { Movie } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface EditMovieDialogProps {
  onEdit: (movie: Movie) => void;
}

function EditMovieDialog() {
  const {onEdit} = useOutletContext<EditMovieDialogProps>();
  const {navigateWithQuery} = useNavigateWithQuery()
  const movie = useLoaderData() as Movie;
  const [movieToUpdate, setMovieToUpdate] = useState<Movie>();

  const [updateMovie, loading, error, updatedMovie] = useFetch(async (cancelToken) => {
    return MovieService.updateMovie(movieToUpdate as Movie, cancelToken);
  })

  useEffect(() => {
    if (movieToUpdate) {
      void updateMovie();
    }
  }, [movieToUpdate]);

  useEffect(() => {
    if (updatedMovie) {
      navigateWithQuery(`/${updatedMovie.id}`);
      onEdit(updatedMovie);
    }
  }, [updatedMovie]);

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

export default EditMovieDialog;

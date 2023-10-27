'use client'
import React, { useEffect, useState } from 'react';
import { GENRES } from '@data/Genre';
import { useFetch } from '@hooks/useFetch';
import { useNavigateWithQuery } from '@hooks/useNavigateWithQuery';
import { Movie } from '@models/Movie';
import MovieService from '../../../services/MovieService';
import Dialog from '../../common/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface EditMovieDialogProps {
  movie: Movie;
}

function EditMovieDialog({movie}: EditMovieDialogProps) {
  const {navigateWithQuery} = useNavigateWithQuery()
  const [movieToUpdate, setMovieToUpdate] = useState<Movie>();

  const [updateMovie, loading, error] = useFetch(async (cancelToken) => {
    return MovieService.updateMovie(movieToUpdate as Movie, cancelToken);
  })

  useEffect(() => {
    if (movieToUpdate) {
      updateMovie().then((updatedMovie) => {
        navigateWithQuery(`/${updatedMovie.id}`);
      });
    }
  }, [movieToUpdate]);

  const handleEditMovieSubmit = async (movie: Movie) => {
    setMovieToUpdate(movie);
  }

  const handleDialogClose = () => {
    navigateWithQuery(`/${movie.id}`);
  }

  return (
      <Dialog title="Edit Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={movie} loading={loading} error={error} genres={GENRES} onSubmit={handleEditMovieSubmit}/>
      </Dialog>
  );
}

export default EditMovieDialog;

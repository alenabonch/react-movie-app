import React, { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { GENRES } from '../../../data/Genre';
import { useFetch } from '../../../hooks/useFetch';
import { useNavigateWithQuery } from '../../../hooks/useNavigateWithQuery';
import { Movie } from '../../../models/Movie';
import MovieService from '../../../services/MovieService';
import Dialog from '../../common/Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

interface EditMovieDialogProps {
  onEdit: (movie: Movie) => void;
}

function EditMovieDialog() {
  const {onEdit} = useOutletContext<EditMovieDialogProps>();
  const {navigateWithQuery} = useNavigateWithQuery()
  const movie = useLoaderData() as Movie;
  const [movieToUpdate, setMovieToUpdate] = useState<Movie>();

  const [updateMovie, loading, error] = useFetch(async (cancelToken) => {
    return MovieService.updateMovie(movieToUpdate as Movie, cancelToken);
  })

  useEffect(() => {
    if (movieToUpdate) {
      updateMovie().then((updatedMovie) => {
        navigateWithQuery(`/${updatedMovie.id}`);
        onEdit(updatedMovie);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default EditMovieDialog;

import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import MovieService from '../../services/MovieService';
import { Button } from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

interface DeleteMovieDialogProps {
  movieId: string;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

function DeleteMovieDialog({movieId, open, onClose, onDelete}: DeleteMovieDialogProps) {
  const {navigateWithQuery} = useNavigateWithQuery();
  const [deleteMovie, loading, error, movieDeleted] = useFetch(async (cancelToken) => {
    return MovieService.deleteMovie(movieId, cancelToken);
  })

  useEffect(() => {
    if (movieDeleted) {
      navigateWithQuery('/');
      onDelete(movieId);
      onClose();
    }
  }, [movieDeleted]);

  const handleDeleteMovieSubmit = async () => {
    void deleteMovie();
  }

  return (
      <Dialog title="Delete Movie" open={open} onClose={onClose}>
        <p className="mb-4">Are you sure you want to delete this movie?</p>
        <div className="d-flex justify-content-end">
          { loading && <div className="mt-1 mx-1"><Spinner size="small"/></div> }
          <Button primary onClick={handleDeleteMovieSubmit} data-testid="confirm-delete-button">Confirm</Button>
        </div>
      </Dialog>
  );
}

export default DeleteMovieDialog;

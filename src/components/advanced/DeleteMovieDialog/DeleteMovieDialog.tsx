import React from 'react';
import { useNavigateWithQuery } from '../../../hooks/useNavigateWithQuery';
import { useDeleteMovieMutation } from '../../../services/MovieApi';
import { Button } from '../../common/Button/Button';
import Dialog from '../../common/Dialog/Dialog';
import Spinner from '../../common/Spinner/Spinner';

interface DeleteMovieDialogProps {
  movieId: string;
  open: boolean;
  onClose: () => void;
}

function DeleteMovieDialog({movieId, open, onClose}: DeleteMovieDialogProps) {
  const [deleteMovie, {isLoading}] = useDeleteMovieMutation();
  const {navigateWithQuery} = useNavigateWithQuery();

  const handleDeleteMovieSubmit = async () => {
    await deleteMovie(movieId);
    navigateWithQuery('/');
    onClose();
  }

  return (
      <Dialog title="Delete Movie" open={open} onClose={onClose}>
        <p className="mb-4">Are you sure you want to delete this movie?</p>
        <div className="d-flex justify-content-end">
          { isLoading && <div className="mt-1 mx-1"><Spinner size="small"/></div> }
          <Button primary onClick={handleDeleteMovieSubmit} data-testid="confirm-delete-button">Confirm</Button>
        </div>
      </Dialog>
  );
}

export default DeleteMovieDialog;

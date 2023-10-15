import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useNavigateWithQuery } from '../../../hooks/useNavigateWithQuery';
import MovieService from '../../../services/MovieService';
import { Button } from '../../common/Button/Button';
import Dialog from '../../common/Dialog/Dialog';
import Spinner from '../../common/Spinner/Spinner';

interface DeleteMovieDialogProps {
  movieId: string;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

function DeleteMovieDialog({movieId, open, onClose, onDelete}: DeleteMovieDialogProps) {
  const {navigateWithQuery} = useNavigateWithQuery();
  const [deleteMovie, loading] = useFetch(async (cancelToken) => {
    return MovieService.deleteMovie(movieId, cancelToken);
  })

  const handleDeleteMovieSubmit = async () => {
    await deleteMovie();
    navigateWithQuery('/');
    onDelete(movieId);
    onClose();
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

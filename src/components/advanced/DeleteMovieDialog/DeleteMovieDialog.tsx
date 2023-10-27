'use client'
import { deleteMovie } from '@app/actions';
import { useNavigateWithQuery } from '@hooks/useNavigateWithQuery';
import { Button } from '../../common/Button/Button';
import Dialog from '../../common/Dialog/Dialog';

interface DeleteMovieDialogProps {
  movieId: string;
  open: boolean;
  onClose: () => void;
}

function DeleteMovieDialog({movieId, open, onClose}: DeleteMovieDialogProps) {
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
          <Button primary onClick={handleDeleteMovieSubmit} data-testid="confirm-delete-button">Confirm</Button>
        </div>
      </Dialog>
  );
}

export default DeleteMovieDialog;

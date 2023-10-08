import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import MovieService from '../../services/MovieService';
import { Button } from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

interface DeleteMovieDialogProps {
  onDelete: (id: string) => void;
}

function DeleteMovieDialog() {
  const {onDelete} = useOutletContext<DeleteMovieDialogProps>();
  const {navigateWithQuery} = useNavigateWithQuery()
  const {movieId} = useParams();
  const [movieIdToDelete, setMovieIdToDelete] = useState<string>();

  const [deleteMovie, loading] = useFetch(async (cancelToken) => {
    if (movieIdToDelete) {
      await MovieService.deleteMovie(movieIdToDelete, cancelToken);
      handleDialogClose();
      onDelete(movieIdToDelete);
    }
  })

  useEffect(() => {
    void deleteMovie();
  }, [movieIdToDelete]);

  const handleDeleteMovieSubmit = async () => {
    setMovieIdToDelete(movieId);
  }

  const handleDialogClose = () => {
    navigateWithQuery('/');
  }

  return (
      <Dialog title="Delete Movie" open={true} onClose={handleDialogClose}>
        <p className="mb-4">Are you sure you want to delete this movie?</p>
        <div className="d-flex justify-content-end">
          { loading && <Spinner size="small"/> }
          <Button primary onClick={handleDeleteMovieSubmit}>Confirm</Button>
        </div>
      </Dialog>
  );
}

export default DeleteMovieDialog;

'use client'
import AddMovieDialog from '@components/advanced/AddMovieDialog/AddMovieDialog';
import { useNavigateWithQuery } from '@hooks/useNavigateWithQuery';

export default function AddMoviePage() {
  const {navigateWithQuery} = useNavigateWithQuery()

  const handleDialogClose = () => {
    navigateWithQuery('/');
  }

  return (
      <AddMovieDialog handleDialogClose={handleDialogClose}/>
  );
}

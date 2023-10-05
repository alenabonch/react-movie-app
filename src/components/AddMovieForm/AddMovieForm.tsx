import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { GENRES } from '../../data/Genre';
import { Movie } from '../../models/Movie';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';

function AddMovieForm() {
  const navigate = useNavigate();

  const handleAddMovieSubmit = (movie: Movie) => {
    // send a request to an API endpoint and then navigate to /:movieId
    console.log('movie submitted', movie);
  }

  const handleDialogClose = () => {
    navigate('..');
  }

  return (
      <Dialog title="Add Movie" open={true} onClose={handleDialogClose}>
        <MovieForm movie={null} genres={GENRES} onSubmit={handleAddMovieSubmit}/>
      </Dialog>
  );
}

export default AddMovieForm;

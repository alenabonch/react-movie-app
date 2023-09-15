import React, { useState } from 'react';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import ContextMenu from '../ContextMenu/ContextMenu';
import Dialog from '../Dialog/Dialog';
import './MovieTile.scss';

interface MovieTileProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

function MovieTile({movie, onClick, onEdit, onDelete}: MovieTileProps) {
  const [openDeleteMovieDialog, setOpenDeleteMovieDialog] = useState(false);
  const menuOptions = ['Edit', 'Delete'];
  const handleTileClick = () => {
    onClick(movie);
  }

  const handleMenuOptionClick = (option: string) => {
    switch (option) {
      case 'Edit': {
        onEdit(movie);
        break;
      }
      case 'Delete': {
        setOpenDeleteMovieDialog(true);
        break;
      }
    }
  }

  const handleDeleteConfirmedClick = () => {
    onDelete(movie.id);
    setOpenDeleteMovieDialog(false);
  }

  return (
    <div className="movie-tile position-relative" onClick={handleTileClick} data-testid="movie-tile">
      <img className="movie-tile__image" src={movie.imageUrl} alt=""/>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="movie-tile__title text-truncate">{movie.title}</h3>
        <span className="movie-tile__date">{movie.releaseDate}</span>
      </div>
      <div className="movie-tile__genres text-truncate">
        {movie.genres.join(', ')}
      </div>
      <div className="movie-tile__menu position-absolute">
        <ContextMenu options={menuOptions} onSelect={handleMenuOptionClick}/>
      </div>
      <Dialog title="Delete Movie" open={openDeleteMovieDialog} onClose={setOpenDeleteMovieDialog.bind(null, false)}>
        <p className="mb-4">Are you sure you want to delete this movie?</p>
        <Button label="Confirm" primary onClick={handleDeleteConfirmedClick} className="float-end"></Button>
      </Dialog>
    </div>
  );
}

export default MovieTile;

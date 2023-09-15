import React, { useState } from 'react';
import './MovieTile.scss';
import { Button } from '../Button/Button';
import ContextMenu from '../ContextMenu/ContextMenu';
import Dialog from '../Dialog/Dialog';

export interface MovieInfo {
  id: string;
  name: string;
  year: string;
  imageUrl: string;
  genres: string[];
}

interface MovieTileProps {
  movieInfo: MovieInfo;
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function MovieTile({movieInfo, onClick, onEdit, onDelete}: MovieTileProps) {
  const [openDeleteMovieDialog, setOpenDeleteMovieDialog] = useState(false);
  const menuOptions = ['Edit', 'Delete'];
  const handleTileClick = () => {
    onClick(movieInfo.id);
  }

  const handleMenuOptionClick = (option: string) => {
    switch (option) {
      case 'Edit': {
        onEdit(movieInfo.id);
        break;
      }
      case 'Delete': {
        setOpenDeleteMovieDialog(true);
        break;
      }
    }
  }

  const handleDeleteConfirmedClick = () => {
    onDelete(movieInfo.id);
    setOpenDeleteMovieDialog(false);
  }

  return (
    <div className="movie-tile position-relative" onClick={handleTileClick} data-testid="movie-tile">
      <img className="movie-tile__image" src={movieInfo.imageUrl} alt=""/>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="movie-tile__name text-truncate">{movieInfo.name}</h3>
        <span className="movie-tile__year">{movieInfo.year}</span>
      </div>
      <div className="movie-tile__genres text-truncate">
        {movieInfo.genres.join(', ')}
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

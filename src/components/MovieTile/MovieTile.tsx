import React, { useState } from 'react';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import ContextMenu from '../ContextMenu/ContextMenu';
import Dialog from '../Dialog/Dialog';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import MovieForm from '../MovieForm/MovieForm';
import './MovieTile.scss';

interface MovieTileProps {
  movie: Movie;
  genres: string[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

function MovieTile({movie, genres, onEdit, onDelete}: MovieTileProps) {
  const [openDeleteMovieDialog, setOpenDeleteMovieDialog] = useState(false);
  const [openEditMovieDialog, setOpenEditMovieDialog] = useState(false);
  const menuOptions = ['Edit', 'Delete'];

  const handleMenuOptionClick = (option: string) => {
    switch (option) {
      case 'Edit': {
        setOpenEditMovieDialog(true);
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

  const handleEditMovieSubmit = (movieForm: Movie) => {
    onEdit(movieForm);
    setOpenEditMovieDialog(false);
  }

  const handleEditMovieDialogOpenChange = (open: boolean) => {
    setOpenEditMovieDialog(open);
  }

  return (
    <div className="movie-tile position-relative mb-4" data-testid="movie-tile">
      <LinkWithQuery to={movie.id}>
        <img className="movie-tile__image" src={movie.posterUrl} alt=""/>
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
          <Button primary onClick={handleDeleteConfirmedClick} className="float-end">Confirm</Button>
        </Dialog>
        <Dialog title="Edit Movie" open={openEditMovieDialog} onClose={handleEditMovieDialogOpenChange.bind(null, false)}>
          <MovieForm movie={movie} genres={genres} error={null as any} loading={false} onSubmit={handleEditMovieSubmit}/>
        </Dialog>
      </LinkWithQuery>
    </div>
  );
}

export default MovieTile;

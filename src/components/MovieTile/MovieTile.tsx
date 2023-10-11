import React, { useState } from 'react';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import { Movie } from '../../models/Movie';
import ContextMenu from '../ContextMenu/ContextMenu';
import DeleteMovieDialog from '../DeleteMovieDialog/DeleteMovieDialog';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import './MovieTile.scss';

interface MovieTileProps {
  movie: Movie;
  onDelete: (id: string) => void;
}

function MovieTile({movie, onDelete}: MovieTileProps) {
  const [openDeleteMovieDialog, setOpenDeleteMovieDialog] = useState(false);
  const {navigateWithQuery} = useNavigateWithQuery();
  const menuOptions = ['Edit', 'Delete'];

  const handleMenuOptionClick = (option: string) => {
    switch (option) {
      case 'Edit': {
        navigateWithQuery(`${movie.id}/edit`);
        break;
      }
      case 'Delete': {
        setOpenDeleteMovieDialog(true);
        break;
      }
    }
  }

  return (
    <div className="movie-tile position-relative mb-4" data-testid="movie-tile">
        <LinkWithQuery to={movie.id}>
          <img className="movie-tile__image" src={movie.posterUrl} alt=""/>
        </LinkWithQuery>
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
        <DeleteMovieDialog movieId={movie.id} onDelete={onDelete} open={openDeleteMovieDialog} onClose={setOpenDeleteMovieDialog.bind(null, false)}/>
    </div>
  );
}

export default MovieTile;

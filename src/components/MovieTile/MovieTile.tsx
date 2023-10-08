import React from 'react';
import { useNavigateWithQuery } from '../../hooks/useNavigateWithQuery';
import { Movie } from '../../models/Movie';
import ContextMenu from '../ContextMenu/ContextMenu';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import './MovieTile.scss';

interface MovieTileProps {
  movie: Movie;
}

function MovieTile({movie}: MovieTileProps) {
  const {navigateWithQuery} = useNavigateWithQuery();
  const menuOptions = ['Edit', 'Delete'];

  const handleMenuOptionClick = (option: string) => {
    switch (option) {
      case 'Edit': {
        navigateWithQuery(`${movie.id}/edit`);
        break;
      }
      case 'Delete': {
        navigateWithQuery(`${movie.id}/delete`);
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
    </div>
  );
}

export default MovieTile;

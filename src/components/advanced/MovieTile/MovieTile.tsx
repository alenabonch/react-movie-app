import React, { useState } from 'react';
import { useNavigateWithQuery } from '../../../hooks/useNavigateWithQuery';
import { Movie } from '../../../models/Movie';
import ContextMenu from '../../common/ContextMenu/ContextMenu';
import DeleteMovieDialog from '../DeleteMovieDialog/DeleteMovieDialog';
import { LinkWithQuery } from '../../common/LinkWithQuery/LinkWithQuery';
import styles from './MovieTile.module.scss';

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
    <div className={styles.movieTile} data-testid="movie-tile">
        <LinkWithQuery to={movie.id}>
          <img className={styles.movieTile__image} src={movie.posterUrl} alt=""/>
        </LinkWithQuery>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className={styles.movieTile__title}>{movie.title}</h3>
          <span className={styles.movieTile__date}>{movie.releaseDate}</span>
        </div>
        <div className={styles.movieTile__genres}>
          {movie.genres.join(', ')}
        </div>
        <div className={styles.movieTile__menu}>
          <ContextMenu options={menuOptions} onSelect={handleMenuOptionClick}/>
        </div>
        <DeleteMovieDialog movieId={movie.id} onDelete={onDelete} open={openDeleteMovieDialog} onClose={setOpenDeleteMovieDialog.bind(null, false)}/>
    </div>
  );
}

export default MovieTile;

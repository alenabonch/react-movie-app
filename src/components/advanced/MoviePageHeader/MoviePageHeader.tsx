import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Movie, MovieDraft } from '../../../models/Movie';
import AddMovieButton from '../AddMovieButton/AddMovieButton';
import LogoButton from '../LogoButton/LogoButton';
import ReturnToSearchButton from '../ReturnToSearchButton/ReturnToSearchButton';
import styles from './MoviePageHeader.module.scss'

interface MoviePageHeaderProps {
  onAdd: (movie: MovieDraft) => void;
  onEdit: (movie: Movie) => void;
}

function MoviePageHeader({onAdd, onEdit}: MoviePageHeaderProps) {
  const {movieId} = useParams();

  return (
      <div className={styles.moviePageHeader}>
        <div className="d-flex justify-content-between">
          <LogoButton/>
          {movieId
              ? <ReturnToSearchButton/>
              : <AddMovieButton/>
          }
        </div>
        <Outlet context={{onAdd, onEdit}}/>
      </div>
  );
}

export default MoviePageHeader;

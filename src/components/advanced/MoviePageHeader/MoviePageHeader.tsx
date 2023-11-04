import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import AddMovieButton from '../AddMovieButton/AddMovieButton';
import LogoButton from '../LogoButton/LogoButton';
import ReturnToSearchButton from '../ReturnToSearchButton/ReturnToSearchButton';
import styles from './MoviePageHeader.module.scss'


function MoviePageHeader() {
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
        <Outlet/>
      </div>
  );
}

export default MoviePageHeader;

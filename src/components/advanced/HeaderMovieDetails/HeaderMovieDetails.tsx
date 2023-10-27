import MovieDetails from '@components/advanced/MovieDetails/MovieDetails';
import styles from '@styles/HomePage.module.scss';
import React from 'react';
import { Movie } from '@models/Movie';
import LogoButton from '../LogoButton/LogoButton';
import ReturnToSearchButton from '../ReturnToSearchButton/ReturnToSearchButton';

interface HeaderMovieDetailsProps {
  movie: Movie;
}

function HeaderMovieDetails({movie}: HeaderMovieDetailsProps) {
  return (
      <div className={styles.homePage__header}>
        <div className="d-flex justify-content-between">
          <LogoButton/>
          <ReturnToSearchButton/>
        </div>
        <div className="p-2">
          <MovieDetails movie={movie}/>
        </div>
      </div>
  );
}

export default HeaderMovieDetails;

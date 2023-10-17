import React, { useRef } from 'react';
import MovieTile from '../MovieTile/MovieTile';
import { useObserver } from '../../../hooks/useObserver';
import { Movie } from '../../../models/Movie';
import Spinner from '../../common/Spinner/Spinner';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  totalAmount: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
}

function MovieList({movies, loading, error, page, totalPages, totalAmount, onDelete, onPageChange} : MovieListProps) {
  const lastElement = useRef<HTMLDivElement>(null);
  const canLoad = (page < totalPages) && !error;

  useObserver(lastElement, canLoad, loading, () => {
    onPageChange(page + 1);
  });

  return (
      <div className={styles.movieList}>
        <div className={styles.movieList__total} data-testid="movies-found"><strong>{totalAmount}</strong> movies found</div>
        {
          error &&
            <div className={styles.movieList__error}>
              <div className="p-5">
                <i className="fa-solid fa-triangle-exclamation m-1"></i>Something went wrong...
              </div>
            </div>
        }
        <div className="d-flex justify-content-around flex-wrap py-3">
          {movies.map((movie) => (
              <MovieTile movie={movie} key={movie.id} onDelete={onDelete}/>
          ))}
        </div>
        {
            loading &&
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Spinner size="large"/>
            </div>
        }
        <div ref={lastElement} className={styles.movieList__lastElement}></div>
      </div>
  );
}

export default MovieList;

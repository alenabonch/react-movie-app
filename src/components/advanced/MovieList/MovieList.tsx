'use client'
import { Movie } from '@models/Movie';
import { updateUrlSearchParams } from '@utils/RouterUtils';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactPaginate from 'react-paginate';
import MovieTile from '../MovieTile/MovieTile';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Movie[];
  error: boolean;
  page: number;
  totalPages: number;
  totalAmount: number;
}

function MovieList({movies, error, totalPages, page, totalAmount} : MovieListProps) {
  const router = useRouter();

  const handlePageClick = (event: any) => {
    const url = updateUrlSearchParams('page', (event.selected + 1).toString());
    router.push(url.toString());
  };

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
              <MovieTile movie={movie} key={movie.id}/>
          ))}
        </div>
        <div className={styles.movieList__pagination}>
          <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
          />
        </div>
      </div>
  );
}

export default MovieList;

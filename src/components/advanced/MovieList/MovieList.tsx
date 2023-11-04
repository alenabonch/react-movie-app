import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../../../models/Movie';
import Spinner from '../../common/Spinner/Spinner';
import MovieTile from '../MovieTile/MovieTile';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  totalAmount: number;
}

function MovieList({movies, page, loading, totalPages, error, totalAmount} : MovieListProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (event: any) => {
    searchParams.set('page', (event.selected + 1).toString());
    setSearchParams(searchParams);
  }

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
        {
            loading &&
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Spinner size="large"/>
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
              initialPage={page - 1}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"
              className="movies-pagination"
              renderOnZeroPageCount={null}
          />
        </div>
      </div>
  );
}

export default MovieList;

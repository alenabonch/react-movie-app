import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { GENRES } from '../../../data/Genre';
import { SortBy, SortOrder } from '../../../models/Movie';
import { useGetMoviesQuery } from '../../../services/MovieApi';
import { prepareRequestParams } from '../../../utils/MovieUtils';
import MovieFilters from '../../advanced/MovieFilters/MovieFilters';
import MovieList from '../../advanced/MovieList/MovieList';
import MoviePageHeader from '../../advanced/MoviePageHeader/MoviePageHeader';
import styles from './MovieListPage.module.scss';


function MovieListPage() {
  const genres = ['All', ...GENRES];
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') as SortBy || 'release_date';
  const sortOrder = searchParams.get('sortOrder') as SortOrder || 'desc';
  const genre = searchParams.get('genre') || genres[0];
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const requestParams = prepareRequestParams(query, sortBy, sortOrder, page, genre);
  const {data, isFetching, isError} = useGetMoviesQuery(requestParams);

  return (
      <div className={styles.movieListPage}>
        <div className={styles.movieListPage__header}>
          <MoviePageHeader/>
        </div>
        <div className={styles.movieListPage__body}>
          <MovieFilters genres={genres}/>
          <MovieList movies={data?.data ?? []}
                     error={!!isError}
                     loading={isFetching}
                     page={page}
                     totalPages={data?.totalPages ?? 0}
                     totalAmount={data?.totalAmount ?? 0}
          />
        </div>
        <div className="logo d-flex justify-content-center mt-4"><strong>netflix</strong>roulette</div>
      </div>
  );
}

export default MovieListPage;

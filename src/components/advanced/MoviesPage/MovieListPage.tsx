import { getMovies } from '@app/actions';
import MovieFilters from '@components/advanced/MovieFilters/MovieFilters';
import MovieList from '@components/advanced/MovieList/MovieList';
import { GENRES } from '@data/Genre';
import { SortBy, SortOrder } from '@models/Movie';
import styles from '@styles/HomePage.module.scss';
import { prepareRequestParams } from '@utils/MovieUtils';
import { getPageCount } from '@utils/PageUtils';
import React, { use } from "react";

export default function MoviesPage({searchParams}: any) {
  const genres = ['All', ...GENRES];
  const limit = 6;

  const query = searchParams.query || '';
  const sortBy = searchParams.sortBy as SortBy || 'release_date';
  const sortOrder = searchParams.sortOrder as SortOrder || 'desc';
  const genre = searchParams.genre || genres[0];
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const params = prepareRequestParams(query, sortBy, sortOrder, limit, page, genre);
  const {data, error} = use(getMovies(params));

  const totalAmount = data?.totalAmount ?? 0;
  const totalPages = getPageCount(totalAmount, limit);
  const movies = data?.data ?? [];

  return (
      <div className={styles.homePage}>
        <div className={styles.homePage__body}>
          <MovieFilters genres={genres}/>
          <MovieList movies={movies}
                     error={!!error}
                     totalPages={totalPages}
                     totalAmount={totalAmount}
                     page={page}
          />
        </div>
      </div>
  );
}

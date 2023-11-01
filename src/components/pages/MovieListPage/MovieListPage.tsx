import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviePageHeader from '../../advanced/MoviePageHeader/MoviePageHeader';
import MovieFilters from '../../advanced/MovieFilters/MovieFilters';
import MovieList from '../../advanced/MovieList/MovieList';
import { GENRES } from '../../../data/Genre';
import { useFetch } from '../../../hooks/useFetch';
import { Movie, SortBy, SortOrder } from '../../../models/Movie';
import MovieService from '../../../services/MovieService';
import { prepareRequestParams } from '../../../utils/MovieUtils';
import styles from './MovieListPage.module.scss';


function MovieListPage() {
  const genres = ['All', ...GENRES];
  const limit = 6;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') as SortBy || 'release_date';
  const sortOrder = searchParams.get('sortOrder') as SortOrder || 'desc';
  const genre = searchParams.get('genre') || genres[0];
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const [fetchMovies, moviesLoading, moviesError] = useFetch(async (cancelToken) => {
    const params = prepareRequestParams(query, sortBy, sortOrder, limit, page, genre);
    const response = await MovieService.getMovies(params, cancelToken);
    const movies = response.data;
    setMovies(movies);
    setTotalAmount(response.totalAmount);
    setTotalPages(response.totalPages);
  })

  useEffect(() => {
    void fetchMovies();
  }, [page, sortBy, sortOrder, query, genre]);

  const handleAddMovie = () => {
    void fetchMovies();
  }

  const handleEditMovie = (updatedMovie: Movie) => {
    const updatedMovies = movies.map((movie) => movie.id === updatedMovie.id ? updatedMovie : movie);
    setMovies(updatedMovies)
  }

  const handleDeleteMovie = () => {
    void fetchMovies();
  }

  return (
      <div className={styles.movieListPage}>
        <div className={styles.movieListPage__header}>
          <MoviePageHeader onAdd={handleAddMovie}
                           onEdit={handleEditMovie}/>
        </div>
        <div className={styles.movieListPage__body}>
          <MovieFilters genres={genres}/>
          <MovieList movies={movies}
                     error={!!moviesError}
                     loading={moviesLoading}
                     page={page}
                     totalPages={totalPages}
                     totalAmount={totalAmount}
                     onDelete={handleDeleteMovie}
          />
        </div>
        <div className="logo d-flex justify-content-center mt-4"><strong>netflix</strong>roulette</div>
      </div>
  );
}

export default MovieListPage;

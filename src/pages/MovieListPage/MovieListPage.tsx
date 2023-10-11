import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MovieFilters from '../../components/MovieFilters/MovieFilters';
import MovieList from '../../components/MovieList/MovieList';
import { GENRES } from '../../data/Genre';
import { useFetch } from '../../hooks/useFetch';
import { usePrevious } from '../../hooks/usePrevious';
import { Movie, SortBy, SortOrder } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import { prepareRequestParams } from '../../utils/MovieUtils';
import { getPageCount } from '../../utils/PageUtils';
import './MovieListPage.scss';


function MovieListPage() {
  const genres = ['All', ...GENRES];
  const limit = 6;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page) ?? 0;

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') as SortBy || 'release_date';
  const sortOrder = searchParams.get('sortOrder') as SortOrder || 'desc';
  const genre = searchParams.get('genre') || genres[0];

  const [fetchMovies, moviesLoading, moviesError] = useFetch(async (cancelToken) => {
    const loadMore = page > prevPage;
    const params = prepareRequestParams(query, sortBy, sortOrder, limit, page, genre);
    const response = await MovieService.getMovies(params, cancelToken);
    const updatedMovies = loadMore ? [...movies, ...response.data] : response.data;
    setMovies(updatedMovies);
    setTotalAmount(response.totalAmount);
    setTotalPages(getPageCount(response.totalAmount, limit));
  })

  useEffect(() => {
    const filterChanged = page === prevPage;
    const resetPage = (page !== 1) && filterChanged;
    if (resetPage) {
      setPage(1);
    } else {
      void fetchMovies();
    }
  }, [page, sortBy, sortOrder, query, genre]);

  const handlePageChange = (page: number) => {
    setPage(page);
  }

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
      <div className="movie-list-page p-5">
        <div className="movie-list-page__header container mb-2 d-flex flex-column px-5 py-4">
          <Header onAdd={handleAddMovie}
                  onEdit={handleEditMovie}/>
        </div>
        <div className="movie-list-page__body container px-5">
          <MovieFilters genres={genres}/>
          <MovieList movies={movies}
                     error={!!moviesError}
                     loading={moviesLoading}
                     page={page}
                     totalPages={totalPages}
                     totalAmount={totalAmount}
                     onPageChange={handlePageChange}
                     onDelete={handleDeleteMovie}
          />
        </div>
        <div className="logo d-flex justify-content-center mt-4"><strong>netflix</strong>roulette</div>
      </div>
  );
}

export default MovieListPage;

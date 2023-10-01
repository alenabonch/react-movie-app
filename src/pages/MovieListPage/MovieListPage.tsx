import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import GenreSelect from '../../components/GenreSelect/GenreSelect';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import SortControl from '../../components/SortControl/SortControl';
import SortOrderControl from '../../components/SortOrder/SortOrderControl';
import { useFetch } from '../../hooks/useFetch';
import { genresMock } from '../../mocks/Genre';
import { Movie, MoviesRequest, SortBy, SortOrder } from '../../models/Movie';
import MovieService from '../../services/MovieService';
import { getPageCount } from '../../utils/PageUtils';
import './MovieListPage.scss';

function MovieListPage() {
  const movieService = new MovieService();
  const genres = ['All', ...genresMock];
  const limit = 6;
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') as SortBy || 'release_date';
  const sortOrder = searchParams.get('sortOrder') as SortOrder || 'desc';
  const selectedGenre = searchParams.get('genre') || genres[0];

  const {movieId} = useParams();

  const prepareRequestParams = (): MoviesRequest => {
    return {
      search: searchQuery,
      searchBy: 'title',
      sortBy: sortBy,
      sortOrder: sortOrder,
      limit: limit.toString(),
      offset: ((page - 1) * limit).toString(),
      filter: selectedGenre !== 'All' ? selectedGenre : ''
    }
  }

  const [fetchMovies, moviesLoading, moviesError] = useFetch(async (cancelToken) => {
    const response = await movieService.getMovies(prepareRequestParams(), cancelToken);
    setMovies([...movies, ...response.data]);
    setTotalAmount(response.totalAmount);
    setTotalPages(getPageCount(response.totalAmount, limit));
  })

  useEffect(() => {
    void fetchMovies();
  }, [page, sortBy, sortOrder, searchQuery, selectedGenre]);

  const resetSearch = () => {
    setTotalAmount(0);
    setMovies([]);
    setPage(1);
  }

  const handleSearch = (query: string) => {
    resetSearch();
    searchParams.set('query', query);
    setSearchParams(searchParams);
  }

  const handleSort = (sortBy: SortBy) => {
    resetSearch();
    searchParams.set('sortBy', sortBy);
    setSearchParams(searchParams);
  }

  const handleSortOrder = (sortOrder: SortOrder) => {
    resetSearch();
    searchParams.set('sortOrder', sortOrder);
    setSearchParams(searchParams);
  }

  const handleGenreSelect = (genre: string) => {
    resetSearch();
    searchParams.set('genre', genre);
    setSearchParams(searchParams);
  }

  const handlePageChange = (page: number) => {
    setPage(page);
  }

  const handleSelectedMovieChange = (movie: Movie | null) => {
    if (movie?.id === movieId) return;

    let pathname = movie ? `/${movie.id}` : '/';
    navigate({
      pathname,
      search: searchParams.toString()
    });
  }

  const handleAddMovie = (movie: Movie) => {
    console.log('Add movie submitted', movie);
  }

  const handleEditMovie = (movie: Movie) => {
    console.log('Edit movie submitted', movie);
  }

  const handleDeleteMovie = (id: string) => {
    console.log('Delete movie clicked', id);
  }

  return (
      <div className="movie-list-page p-5">
        <div className="movie-list-page__header container mb-2 d-flex flex-column px-5 py-4">
          <Header query={searchQuery}
                  selectedMovieId={movieId as string}
                  onSearch={handleSearch}
                  genres={genres}
                  onSelectedMovieReset={handleSelectedMovieChange.bind(null, null)}
                  onAddMovieSubmit={handleAddMovie}/>
        </div>
        <div className="movie-list-page__body container px-5">
          <div className="d-flex justify-content-between">
            <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={handleGenreSelect}/>
            <div className="d-flex align-items-center">
              <SortOrderControl sortOrder={sortOrder} onSortOrderChange={handleSortOrder}/>
              <SortControl sort={sortBy} onSortChange={handleSort}/>
            </div>
          </div>
          <MovieList movies={movies}
                     genres={genres}
                     error={!!moviesError}
                     loading={moviesLoading}
                     page={page}
                     totalPages={totalPages}
                     totalAmount={totalAmount}
                     onClick={handleSelectedMovieChange}
                     onPageChange={handlePageChange}
                     onEdit={handleEditMovie}
                     onDelete={handleDeleteMovie}/>
        </div>
        <div className="logo d-flex justify-content-center mt-4"><strong>netflix</strong>roulette</div>
      </div>
  );
}

export default MovieListPage;

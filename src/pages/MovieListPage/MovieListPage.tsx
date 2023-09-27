import React, { useEffect, useState } from 'react';
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('release_date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>(genres[0]);

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
    setMovies([]);
    setPage(1);
  }

  const handleSearch = (query: string) => {
    resetSearch();
    setSearchQuery(query);
  }

  const handleSort = (sort: SortBy) => {
    resetSearch();
    setSortBy(sort);
  }

  const handleSortOrder = (sortOrder: SortOrder) => {
    resetSearch();
    setSortOrder(sortOrder);
  }

  const handleGenreSelect = (genre: string) => {
    resetSearch();
    setSelectedGenre(genre);
  }

  const handlePageChange = (page: number) => {
    setPage(page);
  }

  const handleSelectedMovieChange = (movie: Movie | null) => {
    setSelectedMovie(movie);
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
                  onSearch={handleSearch}
                  selectedMovie={selectedMovie}
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

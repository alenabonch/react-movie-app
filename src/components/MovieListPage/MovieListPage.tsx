import React, { useState } from 'react';
import { genresMock } from '../../mocks/Genre';
import { movieMock, movieMock2, movieMock3 } from '../../mocks/Movie';
import { Movie } from '../../models/Movie';
import GenreSelect from '../GenreSelect/GenreSelect';
import Header from '../Header/Header';
import MovieTile from '../MovieTile/MovieTile';
import SortControl, { SortType } from '../SortControl/SortControl';
import './MovieListPage.scss';

function MovieListPage() {
  const genres = ['All', ...genresMock];
  const [movies, setMovies] = useState<Movie[]>([movieMock, movieMock2, movieMock3]);
  const [sort, setSort] = useState<SortType>('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>(genres[0]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('searching for item...', query);
  }

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  }

  const handleSortChange = (sort: SortType) => {
    setSort(sort);
    console.log('sort changed', sort);
  }

  const handleTileClick = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const handleAddMovieSubmit = (movie: Movie) => {
    console.log('Add movie submitted', movie);
  }

  const handleEditMovieSubmitted = (movie: Movie) => {
    console.log('Edit movie submitted', movie);
  }

  const handleDeleteClick = (id: string) => {
    console.log('Delete movie clicked', id);
  }

  const handleSelectedMovieChange = (movie: Movie | null) => {
    setSelectedMovie(movie);
  }

  return (
      <div className="movie-list-page p-5">
        <div className="movie-list-page__header container mb-2 d-flex flex-column px-5 py-4">
          <Header query={searchQuery}
                  onSearch={handleSearch}
                  selectedMovie={selectedMovie}
                  genres={genres}
                  onSelectedMovieReset={handleSelectedMovieChange.bind(null, null)}
                  onAddMovieSubmit={handleAddMovieSubmit}/>
        </div>
        <div className="movie-list-page__body container px-5">
          <div className="d-flex justify-content-between">
            <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={handleGenreSelect}/>
            <SortControl sort={sort} onSortChange={handleSortChange}/>
          </div>
          <div className="d-flex justify-content-between flex-wrap py-3">
            {movies.map((movie) => (
                <MovieTile movie={movie}
                           key={movie.id}
                           genres={genres}
                           onClick={handleTileClick}
                           onEdit={handleEditMovieSubmitted}
                           onDelete={handleDeleteClick}/>
            ))}
          </div>
        </div>
        <div className="logo d-flex justify-content-center mt-4"><strong>netflix</strong>roulette</div>
      </div>
  );
}

export default MovieListPage;

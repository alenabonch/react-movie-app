import React, { useState } from 'react';
import './App.scss';
import GenreSelect from './components/GenreSelect/GenreSelect';
import Header from './components/Header/Header';
import MovieTile from './components/MovieTile/MovieTile';
import SortControl from './components/SortControl/SortControl';
import { genresMock } from './mocks/Genre';
import { movieMock, movieMock2, movieMock3 } from './mocks/Movie';
import { Movie } from './models/Movie';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const movies = [movieMock, movieMock2, movieMock3];
  const genres = ['All', ...genresMock];

  const handleSearch = (text: string) => {
    console.log('searching for item...', text);
  }

  const handleGenreSelect = (genre: string) => {
    console.log('genre selected', genre);
  }

  const handleSortChange = (sort: string) => {
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
    <div className="App p-5">
      <div className="App-header container mb-2 d-flex flex-column px-5 py-4">
        <Header onSearch={handleSearch}
                selectedMovie={selectedMovie}
                genres={genres}
                onSelectedMovieReset={handleSelectedMovieChange.bind(null, null)}
                onAddMovieSubmit={handleAddMovieSubmit}/>
      </div>
      <div className="App-body container px-5">
        <div className="d-flex justify-content-between">
          <GenreSelect genres={genres} initialSelectedGenre={genres[0]} onSelect={handleGenreSelect}/>
          <SortControl initialSort="title" onSortChange={handleSortChange}/>
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

export default App;

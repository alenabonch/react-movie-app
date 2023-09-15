import React, { useState } from 'react';
import { movieMock, movieMock2, movieMock3 } from './mocks/Movie';
import { Button } from './components/Button/Button';
import Dialog from './components/Dialog/Dialog';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieForm from './components/MovieForm/MovieForm';
import MovieTile from './components/MovieTile/MovieTile';
import SearchForm from './components/SearchForm/SearchForm';
import './App.scss';
import SortControl from './components/SortControl/SortControl';
import { Movie } from './models/Movie';

function App() {
  const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false);
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const movies: Movie[] = [movieMock, movieMock2, movieMock3];

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
    console.log('movie clicked', movie);
  }

  const handleEditClick = (movie: Movie) => {
    console.log('Edit movie clicked', movie);
  }

  const handleDeleteClick = (id: string) => {
    console.log('Delete movie clicked', id);
  }

  const handleAddMovieModalOpenChange = (open: boolean) => {
    setIsAddMovieDialogOpen(open);
  }

  const handleAddMovieFormSubmit = () => {
    console.log('Add movie form submitted');
  }

  return (
    <div className="App p-5">
      <div className="App-header container mb-2 d-flex flex-column">
        <div className="d-flex justify-content-end pt-4">
          <Button label="+ Add Movie" onClick={handleAddMovieModalOpenChange.bind(null, true)} size="small" className="mx-4"/>
          <Dialog title="Add Movie" open={isAddMovieDialogOpen} onClose={handleAddMovieModalOpenChange.bind(null, false)}>
            <MovieForm onSubmit={handleAddMovieFormSubmit}/>
          </Dialog>
        </div>
        <div className="App-search-container p-5">
          <SearchForm onSearch={handleSearch}/>
        </div>
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
                           onClick={handleTileClick}
                           onEdit={handleEditClick}
                           onDelete={handleDeleteClick}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

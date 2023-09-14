import React, { useState } from 'react';
import { Button } from './components/Button/Button';
import Dialog from './components/Dialog/Dialog';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieTile, { MovieInfo } from './components/MovieTile/MovieTile';
import SearchForm from './components/SearchForm/SearchForm';
import './App.scss';
import SortControl from './components/SortControl/SortControl';

function App() {
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const movies: MovieInfo[] = [
      {id: '1', name: 'Pulp Fiction', genres: ['Action', 'Adventure'], year: '2004', imageUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg'},
      {id: '2', name: 'Bohemian Rhapsody', genres: ['Drama', 'Biography', 'Music'], year: '2003', imageUrl: 'https://m.media-amazon.com/images/I/71kuEWe9PYL._SY445_.jpg'},
      {id: '3', name: 'Inception', genres: ['Action', 'Adventure'], year: '2003', imageUrl: 'https://m.media-amazon.com/images/I/61xzvfJiNkL._AC_.jpg'}
  ];

  const handleSearch = (text: string) => {
    console.log('searching for item...', text);
  }

  const handleGenreSelect = (genre: string) => {
    console.log('genre selected', genre);
  }

  const handleSortChange = (sort: string) => {
    console.log('sort changed', sort);
  }

  const handleTileClick = (id: string) => {
    console.log('movie clicked', id);
  }

  const handleEditClick = (id: string) => {
    console.log('Edit movie clicked', id);
  }

  const handleDeleteClick = (id: string) => {
    console.log('Delete movie clicked', id);
  }

  const handleAddMovieModalOpenChange = (open: boolean) => {
    setIsAddMovieModalOpen(open);
  }

  return (
    <div className="App p-5">
      <div className="App-header container mb-2 d-flex flex-column">
        <div className="d-flex justify-content-end pt-4">
          <Button label="+ Add Movie" onClick={handleAddMovieModalOpenChange.bind(null, true)} size="small" className="mx-4"/>
          <Dialog title="Add Movie" open={isAddMovieModalOpen} onClose={handleAddMovieModalOpenChange.bind(null, false)}>
            Some Content
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
                <MovieTile movieInfo={movie}
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

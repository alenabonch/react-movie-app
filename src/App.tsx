import React from 'react';
import GenreSelect from './components/GenreSelect/GenreSelect';
import MovieTile, { MovieInfo } from './components/MovieTile/MovieTile';
import SearchForm from './components/SearchForm/SearchForm';
import './App.scss';

function App() {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];
  const movies: MovieInfo[] = [
      {id: '1', name: 'Pulp Fiction', genres: ['Action', 'Adventure'], year: '2004', imageUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg'},
      {id: '2', name: 'Bohemian Rhapsody', genres: ['Drama', 'Biography', 'Music'], year: '2003', imageUrl: 'https://foreveryoungadult.com/wp-content/uploads/2021/11/cover-bohemian-rhapsody.jpg'},
      {id: '3', name: 'Inception', genres: ['Action', 'Adventure'], year: '2003', imageUrl: 'https://m.media-amazon.com/images/I/61xzvfJiNkL._AC_.jpg'}
  ];

  const handleSearch = (text: string) => {
    console.log('searching for item...', text);
  }

  const handleGenreSelect = (genre: string) => {
    console.log('genre selected', genre);
  }

  const handleTileClick = (id: string) => {
    console.log('movie clicked', id);
  }

  return (
    <div className="App">
      <div className="App-header container mb-2 d-flex flex-column">
        <div className="App-search-container p-5">
          <SearchForm onSearch={handleSearch}/>
        </div>
      </div>
      <div className="App-body container px-5">
        <GenreSelect genres={genres} initialSelectedGenre={genres[0]} onSelect={handleGenreSelect}/>
        <MovieTile movieInfo={movies[0]} onClick={handleTileClick}></MovieTile>
      </div>
    </div>
  );
}

export default App;

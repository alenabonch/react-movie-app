import React from 'react';
import Counter from './components/Counter/Counter';
import GenreSelect from './components/GenreSelect/GenreSelect';
import SearchForm from './components/SearchForm/SearchForm';
import './App.scss';

function App() {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

  const handleSearch = (text: string) => {
    console.log('searching for item...', text);
  }

  const handleGenreSelect = (genre: string) => {
    console.log('genre selected', genre);
  }

  return (
    <div className="App">
      <div className="App-header container mb-2 d-flex flex-column">
        <div className="App-search-container p-5">
          <SearchForm onSearch={handleSearch}/>
        </div>
      </div>
      <div className="App-body container">
        <GenreSelect genres={genres} initialSelectedGenre={genres[1]} onSelect={handleGenreSelect}/>
        <div className="m-3 mt-5">
          <Counter initialValue={1}/>
        </div>
      </div>
    </div>
  );
}

export default App;

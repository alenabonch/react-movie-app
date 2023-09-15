import React, { useState } from 'react';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import SearchForm from '../SearchForm/SearchForm';
import './Header.scss'

interface HeaderProps {
  selectedMovie: Movie | null;
  onSelectedMovieReset: () => void;
  onSearch: (text: string) => void;
  onAddMovieSubmit: (movie: Movie) => void;
}

function Header({selectedMovie, onSearch, onSelectedMovieReset, onAddMovieSubmit}: HeaderProps) {
  const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false);

  const handleSelectedMovieChange = () => {
    onSelectedMovieReset();
  }

  const handleAddMovieModalOpenChange = (open: boolean) => {
    setIsAddMovieDialogOpen(open);
  }

  return (
      <div className="header">
        <div className="d-flex justify-content-between">
          <div className="header__logo">netflixroulette</div>
          {selectedMovie
              ? <button aria-label="Return to Search" className="header__search-icon" onClick={handleSelectedMovieChange}><i className="fa-solid fa-magnifying-glass"></i></button>
              : <Button label="+ Add Movie" onClick={handleAddMovieModalOpenChange.bind(null, true)} size="small" className="mx-4"/>
          }
        </div>
        { selectedMovie
            ? <MovieDetails movie={selectedMovie}/>
            : <>
              <div className="d-flex justify-content-end pt-4">
                <Dialog title="Add Movie" open={isAddMovieDialogOpen} onClose={handleAddMovieModalOpenChange.bind(null, false)}>
                  <MovieForm onSubmit={onAddMovieSubmit}/>
                </Dialog>
              </div>
              <div className="App-search-container p-5">
                <SearchForm onSearch={onSearch}/>
              </div>
            </>
        }
      </div>
  );
}

export default Header;

import React, { useState } from 'react';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import SearchForm from '../SearchForm/SearchForm';
import './Header.scss'

interface HeaderProps {
  genres: string[];
  query: string;
  selectedMovie: Movie | null;
  onSelectedMovieReset: () => void;
  onSearch: (text: string) => void;
  onAddMovieSubmit: (movie: Movie) => void;
}

function Header({query, genres, selectedMovie, onSearch, onSelectedMovieReset, onAddMovieSubmit}: HeaderProps) {
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);

  const handleSelectedMovieChange = () => {
    onSelectedMovieReset();
  }

  const handleAddMovieDialogOpenChange = (open: boolean) => {
    setOpenAddMovieDialog(open);
  }

  const handleAddMovieSubmit = (movie: Movie) => {
    setOpenAddMovieDialog(false);
    onAddMovieSubmit(movie);
  }

  return (
      <div className="header">
        <div className="d-flex justify-content-between">
          <div className="logo"><strong>netflix</strong>roulette</div>
          {selectedMovie
              ? <button aria-label="Return to Search" className="header__search-icon" onClick={handleSelectedMovieChange}><i className="fa-solid fa-magnifying-glass"></i></button>
              : <Button label="+ Add Movie" onClick={handleAddMovieDialogOpenChange.bind(null, true)} size="small" className="mx-4"/>
          }
        </div>
        { selectedMovie
            ? <MovieDetails movie={selectedMovie}/>
            : <SearchForm initialQuery={query} onSearch={onSearch}/>
        }
        <Dialog title="Add Movie" open={openAddMovieDialog} onClose={handleAddMovieDialogOpenChange.bind(null, false)}>
          <MovieForm movie={null} genres={genres} onSubmit={handleAddMovieSubmit}/>
        </Dialog>
      </div>
  );
}

export default Header;

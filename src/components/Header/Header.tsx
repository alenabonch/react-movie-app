import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import MovieForm from '../MovieForm/MovieForm';
import './Header.scss'

interface HeaderProps {
  genres: string[];
  query: string;
  selectedMovieId: string | null;
  onSelectedMovieReset: () => void;
  onSearch: (text: string) => void;
  onAddMovieSubmit: (movie: Movie) => void;
}

function Header({query, genres, selectedMovieId, onSearch, onSelectedMovieReset, onAddMovieSubmit}: HeaderProps) {
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
          {selectedMovieId
              ? <button aria-label="Return to Search" className="header__search-icon" onClick={handleSelectedMovieChange} data-testid="return-to-search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              : <Button label="+ Add Movie" onClick={handleAddMovieDialogOpenChange.bind(null, true)} size="small" className="mx-4"/>
          }
        </div>
        <Outlet context={{initialQuery: query, onSearch}} />
        <Dialog title="Add Movie" open={openAddMovieDialog} onClose={handleAddMovieDialogOpenChange.bind(null, false)}>
          <MovieForm movie={null} genres={genres} onSubmit={handleAddMovieSubmit}/>
        </Dialog>
      </div>
  );
}

export default Header;

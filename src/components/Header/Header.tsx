import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import Dialog from '../Dialog/Dialog';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import MovieForm from '../MovieForm/MovieForm';
import './Header.scss'

interface HeaderProps {
  genres: string[];
  onAddMovieSubmit: (movie: Movie) => void;
}

function Header({genres, onAddMovieSubmit}: HeaderProps) {
  const [openAddMovieDialog, setOpenAddMovieDialog] = useState(false);
  const {movieId} = useParams();

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
          {movieId
              ? <button aria-label="Return to Search" className="header__search-icon" data-testid="return-to-search">
                  <LinkWithQuery to="/"><i className="fa-solid fa-magnifying-glass"></i></LinkWithQuery>
                </button>
              : <Button onClick={handleAddMovieDialogOpenChange.bind(null, true)} size="small" className="mx-4">
                  + Add Movie
                </Button>
          }
        </div>
        <Outlet/>
        <Dialog title="Add Movie" open={openAddMovieDialog} onClose={handleAddMovieDialogOpenChange.bind(null, false)}>
          <MovieForm movie={null} genres={genres} onSubmit={handleAddMovieSubmit}/>
        </Dialog>
      </div>
  );
}

export default Header;

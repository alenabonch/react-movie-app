import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Movie, MovieDraft } from '../../models/Movie';
import { Button } from '../Button/Button';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import './Header.scss'

interface HeaderProps {
  onAdd: (movie: MovieDraft) => void;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

function Header({onAdd, onEdit, onDelete}: HeaderProps) {
  const {movieId} = useParams();

  return (
      <div className="header">
        <div className="d-flex justify-content-between">
          <div className="logo"><strong>netflix</strong>roulette</div>
          {movieId
              ? <button aria-label="Return to Search" className="header__search-icon" data-testid="return-to-search">
                  <LinkWithQuery to="/"><i className="fa-solid fa-magnifying-glass"></i></LinkWithQuery>
                </button>
              : <Button size="small" className="mx-4">
                  <LinkWithQuery to="new">+ Add Movie</LinkWithQuery>
                </Button>
          }
        </div>
        <Outlet context={{onAdd, onEdit, onDelete}}/>
      </div>
  );
}

export default Header;

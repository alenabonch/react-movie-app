import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Movie, MovieDraft } from '../../../models/Movie';
import { Button } from '../../common/Button/Button';
import { LinkWithQuery } from '../../common/LinkWithQuery/LinkWithQuery';
import './MoviePageHeader.scss'

interface MoviePageHeaderProps {
  onAdd: (movie: MovieDraft) => void;
  onEdit: (movie: Movie) => void;
}

function MoviePageHeader({onAdd, onEdit}: MoviePageHeaderProps) {
  const {movieId} = useParams();

  return (
      <div className="movie-page-header">
        <div className="d-flex justify-content-between">
          <div className="logo"><strong>netflix</strong>roulette</div>
          {movieId
              ? <button aria-label="Return to Search" className="movie-page-header__search-icon" data-testid="return-to-search">
                  <LinkWithQuery to="/"><i className="fa-solid fa-magnifying-glass"></i></LinkWithQuery>
                </button>
              : <Button size="small" className="mx-4" data-testid="add-movie-button">
                  <LinkWithQuery to="new">+ Add Movie</LinkWithQuery>
                </Button>
          }
        </div>
        <Outlet context={{onAdd, onEdit}}/>
      </div>
  );
}

export default MoviePageHeader;

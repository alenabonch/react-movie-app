import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Button } from '../Button/Button';
import { LinkWithQuery } from '../LinkWithQuery/LinkWithQuery';
import './Header.scss'

function Header() {
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
        <Outlet/>
      </div>
  );
}

export default Header;

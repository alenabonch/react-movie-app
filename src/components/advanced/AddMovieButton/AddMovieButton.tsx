import React from 'react';
import { LinkWithQuery } from '../../common/LinkWithQuery/LinkWithQuery';
import { Button } from '../../common/Button/Button';

export default function AddMovieButton() {
  return (
      <Button size="small" className="mx-4" data-testid="add-movie-button">
        <LinkWithQuery to="new">+ Add Movie</LinkWithQuery>
      </Button>
  );
}

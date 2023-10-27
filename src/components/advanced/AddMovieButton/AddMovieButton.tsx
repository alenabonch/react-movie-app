'use client'
import { Button } from '@components/common/Button/Button';
import { LinkWithQuery } from '@components/common/LinkWithQuery/LinkWithQuery';
import React from 'react';

export default function AddMovieButton() {
  return (
      <Button size="small" className="mx-4" data-testid="add-movie-button">
        <LinkWithQuery to="new">+ Add Movie</LinkWithQuery>
      </Button>
  );
}

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Movie } from '../../models/Movie';
import MovieDetails from './MovieDetails';

describe(MovieDetails, () => {
  const movieDetails: Movie = {
    id: '1',
    title: 'Pulp Fiction',
    genres: ['Action', 'Adventure'],
    releaseDate: '2004',
    posterUrl: 'https://image.jpg',
    rating: 8.9,
    duration: '2h 34m',
    overview: 'Good movie',
  };

  it('should render movie details with provided info', () => {
    render(<MovieDetails movie={movieDetails}/>);
    expect(screen.getByRole('img')).toHaveAttribute('src', movieDetails.posterUrl);
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
    expect(screen.getByText('8.9')).toBeInTheDocument();
    expect(screen.getByText('2h 34m')).toBeInTheDocument();
    expect(screen.getByText('Good movie')).toBeInTheDocument();
  });
});

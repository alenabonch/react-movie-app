import { render, screen } from '@testing-library/react';
import React from 'react';
import MovieDetails from './MovieDetails';

describe(MovieDetails, () => {
  const movieDetails = {
    id: '1',
    name: 'Pulp Fiction',
    genres: ['Action', 'Adventure'],
    year: '2004',
    imageUrl: 'https://image.jpg',
    rating: 8.9,
    duration: '2h 34m',
    description: 'Good movie',
  };

  it('should render movie details with provided info', () => {
    render(<MovieDetails movieDetails={movieDetails}/>);
    expect(screen.getByRole('img')).toHaveAttribute('src', movieDetails.imageUrl);
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
    expect(screen.getByText('8.9')).toBeInTheDocument();
    expect(screen.getByText('2h 34m')).toBeInTheDocument();
    expect(screen.getByText('Good movie')).toBeInTheDocument();
  });
});

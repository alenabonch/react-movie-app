import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Movie } from '../../models/Movie';
import MovieTile from './MovieTile';

const mockedUseNavigateWithQuery = jest.fn();
jest.mock('../../hooks/useNavigateWithQuery', () => ({
  useNavigateWithQuery: () => ({navigateWithQuery: mockedUseNavigateWithQuery}),
}));

const movieInfo: Movie = {
  id: '1',
  title: 'Pulp Fiction',
  genres: ['Action', 'Adventure'],
  releaseDate: '2004',
  posterUrl: 'https://image.jpg',
  rating: 8.9,
  duration: 154,
  overview: 'Good movie',
};

const routes = [
  {
    path: '/test',
    element: <MovieTile onDelete={jest.fn()} movie={movieInfo}/>,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/test'],
});

describe(MovieTile, () => {
  it('should render movie tile with provided info', () => {
    render(<RouterProvider router={router}/>);
    expect(screen.getByRole('img')).toHaveAttribute('src', movieInfo.posterUrl);
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
  });

  it('should call onSelect prop with movie id', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router}/>);
    await user.click(screen.getByTestId('movie-tile'));
  });

  it('should call onEdit prop with movie id', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router}/>);
    await user.click(screen.getByLabelText('Options', {selector: 'button'}));
    await user.click(screen.getByText('Edit'));
    expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('1/edit');
  });

  it('should open Delete Movie dialog on delete option click and call onDelete prop on Confirm', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router}/>);
    await user.click(screen.getByLabelText('Options', {selector: 'button'}));
    await user.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete Movie')).toBeInTheDocument();
  });
});

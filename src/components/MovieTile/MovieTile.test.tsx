import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { genresMock } from '../../mocks/Genre';
import { Movie } from '../../models/Movie';
import MovieTile from './MovieTile';

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

const onEdit = jest.fn();
const onDelete = jest.fn();
const genres = genresMock;

const routes = [
  {
    path: '/test',
    element: <MovieTile movie={movieInfo} genres={genres} onEdit={onEdit} onDelete={onDelete}/>,
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
    expect(screen.getByText('Edit Movie')).toBeInTheDocument();
    const submitButton = (screen.getByRole('button', {name: 'Submit'}));
    expect(submitButton).toBeInTheDocument();
  });

  it('should open Delete Movie dialog on delete option click and call onDelete prop on Confirm', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router}/>);
    await user.click(screen.getByLabelText('Options', {selector: 'button'}));
    await user.click(screen.getByText('Delete'));
    expect(screen.getByText('Delete Movie')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();
    const confirmButton = (screen.getByRole('button', {name: 'Confirm'}));
    expect(confirmButton).toBeInTheDocument();
    await user.click(confirmButton);
    expect(onDelete).toHaveBeenCalledWith(movieInfo.id);
  });
});

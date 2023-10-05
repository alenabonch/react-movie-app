import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { genresMock } from '../../mocks/Genre';
import Header from './Header';

const onAddMovieSubmit = jest.fn();

const routes = [
  {
    path: '/',
    element: <Header genres={genresMock} onAddMovieSubmit={onAddMovieSubmit} />,
  },
  {
    path: '/:movieId',
    element: <Header genres={genresMock} onAddMovieSubmit={onAddMovieSubmit} />,
  },
];

describe(Header, () => {
  it('should render Add Movie button when movie is not selected', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/'],});
    render(<RouterProvider router={router} />);
    await waitFor(() => screen.getByText('+ Add Movie'));
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
  });

  it('should render Return to Search button when movie is selected', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/12345'],});
    render(<RouterProvider router={router} />);
    expect(screen.queryByText('+ Add Movie')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Return to Search')).toBeInTheDocument();
  });
});

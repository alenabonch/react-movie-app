import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { renderWithProviders } from '../../../mocks/test-utils';
import AddMovieDialog from './AddMovieDialog';

const mockedUseNavigateWithQuery = jest.fn();
jest.mock('../../../hooks/useNavigateWithQuery', () => ({
  useNavigateWithQuery: () => ({navigateWithQuery: mockedUseNavigateWithQuery}),
}));

const routes = [
  {
    path: '/',
    element: <Outlet/>,
    children: [
      {
        path: '/test',
        element: <AddMovieDialog/>,
      },
    ]
  },
];

describe(AddMovieDialog, () => {
  const user = userEvent.setup();

  it('should render add movie form', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    renderWithProviders(<RouterProvider router={router} />);
    await expect(screen.getByText('Add Movie')).toBeInTheDocument();
  });

  it('should navigate to home on close', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    renderWithProviders(<RouterProvider router={router} />);
    await user.click(screen.getByLabelText('Close Dialog', {selector: 'button'}));
    expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('/')
  });

  it('should call fetch on form submit', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    renderWithProviders(<RouterProvider router={router} />);
    await user.type(screen.getByLabelText('Title'), 'Test Movie');
    await user.type(screen.getByLabelText('Release Date'), '2020-12-23');
    await user.type(screen.getByLabelText('Movie Url'), 'https://example.com/movie.jpg');
    await user.type(screen.getByLabelText('Rating'), '8.5');
    await user.click(screen.getByLabelText('Genre'));
    await user.click(screen.getByText('Drama'));
    await user.type(screen.getByLabelText('Duration'), '120');
    await user.type(screen.getByLabelText('Overview'), 'Test movie overview');

    await waitFor(async () => {
      await user.click(screen.getByText('Submit'));
      await expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('/2')
    });
  });
});

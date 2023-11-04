import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { movieMock } from '../../../data/mocks/Movie';
import { renderWithProviders } from '../../../mocks/test-utils';
import EditMovieDialog from './EditMovieDialog';

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
        element: <EditMovieDialog/>,
        loader: () => movieMock
      },
    ]
  },
];

describe(EditMovieDialog, () => {
  const user = userEvent.setup();

  it('should render edit movie dialog', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    await renderWithProviders(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Edit Movie')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  it('should navigate to home on close', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    renderWithProviders(<RouterProvider router={router} />);
    await waitFor(async () => {
      await user.click(screen.getByLabelText('Close Dialog', {selector: 'button'}));
      expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('/')
    });
  });

  it('should call fetch on form submit', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    renderWithProviders(<RouterProvider router={router} />);

    await waitFor(async () => {
      await user.click(screen.getByText('Submit'));
      expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('/1')
    });
  });
});

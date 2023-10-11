import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import AddMovieDialog from './AddMovieDialog';

const mockedUseNavigateWithQuery = jest.fn();
jest.mock('../../hooks/useNavigateWithQuery', () => ({
  useNavigateWithQuery: () => ({navigateWithQuery: mockedUseNavigateWithQuery}),
}));

const mockedFetch = jest.fn();
jest.mock('../../hooks/useFetch', () => ({
  useFetch: () => ([mockedFetch, null, null]),
}));

const routes = [
  {
    path: '/',
    element: <Outlet context={{onAdd: jest.fn()}}/>,
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
    render(<RouterProvider router={router} />);
    await expect(screen.getByText('Add Movie')).toBeInTheDocument();
  });
});

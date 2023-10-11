import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import EditMovieDialog from './EditMovieDialog';

const mockedFetch = jest.fn();
jest.mock('../../hooks/useFetch', () => ({
  useFetch: () => ([mockedFetch, null, null]),
}));

const routes = [
  {
    path: '/',
    element: <Outlet context={{onEdit: jest.fn()}}/>,
    children: [
      {
        path: '/test',
        element: <EditMovieDialog/>,
      },
    ]
  },
];

describe(EditMovieDialog, () => {
  const user = userEvent.setup();

  it('should render add movie form', () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test']});
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Edit Movie')).toBeInTheDocument();
    const submitButton = (screen.getByRole('button', {name: 'Submit'}));
    expect(submitButton).toBeInTheDocument();
  });
});

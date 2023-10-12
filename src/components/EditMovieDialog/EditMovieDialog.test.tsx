import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { movieMock } from '../../mocks/Movie';
import { Movie } from '../../models/Movie';
import EditMovieDialog from './EditMovieDialog';

const mockedUseNavigateWithQuery = jest.fn();
jest.mock('../../hooks/useNavigateWithQuery', () => ({
  useNavigateWithQuery: () => ({navigateWithQuery: mockedUseNavigateWithQuery}),
}));

const mockedFetch = jest.fn();
jest.mock('../../hooks/useFetch', () => ({
  useFetch: () => ([mockedFetch, null, null]),
}));

const mockOnEdit = jest.fn();
const routes = [
  {
    path: '/',
    element: <Outlet context={{onEdit: mockOnEdit}}/>,
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

  it('should render add movie form', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
    render(<RouterProvider router={router} />);
    // await expect(screen.getByText('Edit Movie')).toBeInTheDocument();

    // await waitFor(() => {
    //   const submitButton = (screen.getByRole('button', {name: 'Submit'}));
    //   expect(submitButton).toBeInTheDocument();
    // });
  });

  // it('should navigate to home on close', async () => {
  //   const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
  //   render(<RouterProvider router={router} />);
  //   await user.click(screen.getByLabelText('Close Dialog', {selector: 'button'}));
  //   expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('/')
  // });

  // it('should call fetch on form submit', async () => {
  //   const router = createMemoryRouter(routes, {initialEntries: ['/', '/test']});
  //   render(<RouterProvider router={router} />);
  //
  //   await user.click(screen.getByText('Submit'));
  //   expect(mockedFetch).toHaveBeenCalled();
  // });
});

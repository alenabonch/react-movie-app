import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import DeleteMovieDialog from './DeleteMovieDialog';

const mockedFetch = jest.fn();
jest.mock('../../../hooks/useFetch', () => ({
  useFetch: () => ([mockedFetch, null, null]),
}));

jest.mock('../../../services/MovieService', () => ({
  deleteMovie: jest.fn().mockResolvedValue({}),
}));

const routes = [
  {
    path: '/',
    element: <div></div>,
  },
  {
    path: '/test',
    element: <DeleteMovieDialog onDelete={jest.fn()} movieId={'123'} onClose={jest.fn()} open={true}/>,
  },
];

describe(DeleteMovieDialog, () => {
  const user = userEvent.setup();

  it('should render delete movie form', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test']});
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Delete Movie')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();
    const confirmButton = (screen.getByText('Confirm'));
    expect(confirmButton).toBeInTheDocument();
    await user.click(confirmButton);
    expect(mockedFetch).toHaveBeenCalled();
  });
});

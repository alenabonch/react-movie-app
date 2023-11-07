import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { renderWithProviders } from '../../../mocks/test-utils';
import DeleteMovieDialog from './DeleteMovieDialog';

const mockedUseNavigateWithQuery = jest.fn();
jest.mock('../../../hooks/useNavigateWithQuery', () => ({
  useNavigateWithQuery: () => ({navigateWithQuery: mockedUseNavigateWithQuery}),
}));

const routes = [
  {
    path: '/',
    element: <div></div>,
  },
  {
    path: '/test',
    element: <DeleteMovieDialog movieId={'1'} onClose={jest.fn()} open={true}/>,
  },
];

describe(DeleteMovieDialog, () => {
  const user = userEvent.setup();

  it('should render delete movie form', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test']});
    renderWithProviders(<RouterProvider router={router} />);
    expect(screen.getByText('Delete Movie')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();
    const confirmButton = (screen.getByText('Confirm'));
    expect(confirmButton).toBeInTheDocument();
    await user.click(confirmButton);
    await expect(mockedUseNavigateWithQuery).toHaveBeenCalledWith('/')
  });
});

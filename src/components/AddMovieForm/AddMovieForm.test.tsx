import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import AddMovieForm from './AddMovieForm';

const routes = [
  {
    path: '/test',
    element: <AddMovieForm/>,
  },
];

describe(AddMovieForm, () => {
  const user = userEvent.setup();

  it('should render empty movie form', () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test']});
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Add Movie')).toBeInTheDocument();
  });
});

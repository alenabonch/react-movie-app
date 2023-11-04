import { screen } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '../../../__mocks__/intersectionObserver';
import { renderWithProviders } from '../../../mocks/test-utils';
import MovieListPage from './MovieListPage';

const routes = [
  {
    path: '/test',
    element: <MovieListPage/>,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/test'],
});

describe(MovieListPage, () => {
  it('should render movie list page', () => {
    renderWithProviders(<RouterProvider router={router}/>);
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '../../__mocks__/intersectionObserver';
import { genresMock } from '../../mocks/Genre';
import MovieFilters from './MovieFilters';

const routes = [
  {
    path: '/test',
    element: <MovieFilters genres={genresMock}/>
  }
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/test'],
});

describe(MovieFilters, () => {
  it('should render movie filters component', () => {
    render(<RouterProvider router={router}/>);
    expect(screen.getByTestId('movie-filters')).toBeInTheDocument();
  });
});

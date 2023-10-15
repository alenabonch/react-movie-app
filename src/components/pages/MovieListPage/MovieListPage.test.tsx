import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '../../../__mocks__/intersectionObserver';
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
    render(<RouterProvider router={router}/>);
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
  });
});

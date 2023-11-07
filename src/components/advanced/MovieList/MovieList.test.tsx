import { screen } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '../../../__mocks__/intersectionObserver';
import { movieMock, movieMock2 } from '../../../data/mocks/Movie';
import { renderWithProviders } from '../../../mocks/test-utils';
import MovieList from './MovieList';


describe(MovieList, () => {
  it('should render movie list with total amount', () => {
    const routes = [
      {
        path: '/test',
        element: <MovieList movies={[movieMock, movieMock2]}
                            loading={false}
                            error={false}
                            page={1}
                            totalPages={10}
                            totalAmount={100}/>
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
    });

    renderWithProviders(<RouterProvider router={router}/>);

    expect(screen.getByTestId('movies-found')).toHaveTextContent('100 movies found');
    expect(screen.getByText(movieMock.title)).toBeInTheDocument();
    expect(screen.getByText(movieMock2.title)).toBeInTheDocument();
  });

  it('should render movie list loading and error', () => {
    const routes = [
      {
        path: '/test',
        element: <MovieList movies={[movieMock]}
                            loading={true}
                            error={true}
                            page={1}
                            totalPages={10}
                            totalAmount={100}/>
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
    });

    renderWithProviders(<RouterProvider router={router}/>);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });
});

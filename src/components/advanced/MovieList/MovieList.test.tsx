import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '../../../__mocks__/intersectionObserver';
import { movieMock, movieMock2 } from '../../../data/mocks/Movie';
import MovieList from './MovieList';

const mockOnPageChange = jest.fn();
const mockOnDelete = jest.fn();

describe(MovieList, () => {
  it('should render movie list with total amount', () => {
    const routes = [
      {
        path: '/test',
        element: <MovieList movies={[movieMock, movieMock2]}
                            loading={false}
                            error={false}
                            page={0}
                            totalPages={10}
                            totalAmount={100}
                            onPageChange={mockOnPageChange}
                            onDelete={mockOnDelete}/>
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
    });

    render(<RouterProvider router={router}/>);

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
                            page={0}
                            totalPages={10}
                            totalAmount={100}
                            onPageChange={mockOnPageChange}
                            onDelete={mockOnDelete}/>
      }
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
    });

    render(<RouterProvider router={router}/>);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });
});

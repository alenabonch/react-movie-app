import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '../../__mocks__/intersectionObserver';
import { genresMock } from '../../mocks/Genre';
import { movieMock, movieMock2 } from '../../mocks/Movie';
import MovieList from './MovieList';

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnPageChange = jest.fn();

describe(MovieList, () => {
  it('should render movie list with total amount', () => {
    const routes = [
      {
        path: '/test',
        element: <MovieList movies={[movieMock, movieMock2]}
                            genres={genresMock}
                            loading={false}
                            error={false}
                            page={0}
                            totalPages={10}
                            totalAmount={100}
                            onEdit={mockOnEdit}
                            onDelete={mockOnDelete}
                            onPageChange={mockOnPageChange}/>
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
                            genres={genresMock}
                            loading={true}
                            error={true}
                            page={0}
                            totalPages={10}
                            totalAmount={100}
                            onEdit={mockOnEdit}
                            onDelete={mockOnDelete}
                            onPageChange={mockOnPageChange}/>
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

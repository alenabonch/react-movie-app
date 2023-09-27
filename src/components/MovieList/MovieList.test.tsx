import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { genresMock } from '../../mocks/Genre';
import { movieMock, movieMock2 } from '../../mocks/Movie';
import MovieList from './MovieList';
import '../../__mocks__/intersectionObserver';

describe(MovieList, () => {
  const user = userEvent.setup();
  const mockOnClick = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnPageChange = jest.fn();

  it('should render movie list with total amount', () => {
    render(<MovieList movies={[movieMock, movieMock2]}
                      genres={genresMock}
                      loading={false}
                      error={false}
                      page={0}
                      totalPages={10}
                      totalAmount={100}
                      onClick={mockOnClick}
                      onEdit={mockOnEdit}
                      onDelete={mockOnDelete}
                      onPageChange={mockOnPageChange}/>);
    expect(screen.getByTestId('movies-found')).toHaveTextContent('100 movies found');
    expect(screen.getByText(movieMock.title)).toBeInTheDocument();
    expect(screen.getByText(movieMock2.title)).toBeInTheDocument();
  });

  it('should render movie list loading and error', () => {
    render(<MovieList movies={[movieMock]}
                      genres={genresMock}
                      loading={true}
                      error={true}
                      page={0}
                      totalPages={10}
                      totalAmount={100}
                      onClick={mockOnClick}
                      onEdit={mockOnEdit}
                      onDelete={mockOnDelete}
                      onPageChange={mockOnPageChange}/>);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });
});

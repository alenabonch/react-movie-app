import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { movieMock } from '../../mocks/Movie';
import MovieForm from './MovieForm';

describe(MovieForm, () => {
  const user = userEvent.setup();
  const mockOnSubmit = jest.fn();
  const mockGenres = ['Action', 'Drama', 'Comedy'];

  it('should render empty movie form', () => {
    render(<MovieForm genres={mockGenres} onSubmit={mockOnSubmit} movie={null}/>);
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Release Date')).toHaveValue('');
    expect(screen.getByLabelText('Movie Url')).toHaveValue('');
    expect(screen.getByLabelText('Rating')).toHaveValue(null);
    expect(screen.getByLabelText('Duration')).toHaveValue(null);
    expect(screen.getByLabelText('Overview')).toHaveValue('');
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Reset'})).toBeInTheDocument()
  });

  it('should render movie form with provided values', () => {
    render(<MovieForm genres={mockGenres} onSubmit={mockOnSubmit} movie={movieMock}/>);
    expect(screen.getByLabelText('Title')).toHaveValue(movieMock.title);
    expect(screen.getByLabelText('Release Date')).toHaveValue(movieMock.releaseDate);
    expect(screen.getByLabelText('Movie Url')).toHaveValue(movieMock.posterUrl);
    expect(screen.getByLabelText('Rating')).toHaveValue(movieMock.rating);
    expect(screen.getByLabelText('Duration')).toHaveValue(movieMock.duration);
    expect(screen.getByLabelText('Overview')).toHaveValue(movieMock.overview);
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Reset'})).toBeInTheDocument()
  });

  it('should submit the form with valid data', async () => {
    render(<MovieForm movie={null} genres={mockGenres} onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText('Title'), 'Test Movie');
    await user.type(screen.getByLabelText('Release Date'), '2023-09-18');
    await user.type(screen.getByLabelText('Movie Url'), 'https://example.com/movie.jpg');
    await user.type(screen.getByLabelText('Rating'), '8.5');
    await user.click(screen.getByLabelText('Genre'));
    await user.click(screen.getByText('Drama'));
    await user.type(screen.getByLabelText('Duration'), '120');
    await user.type(screen.getByLabelText('Overview'), 'Test movie overview');

    await user.click(screen.getByText('Submit'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: '',
      title: 'Test Movie',
      releaseDate: '2023-09-18',
      posterUrl: 'https://example.com/movie.jpg',
      rating: 8.5,
      genres: ['Drama'],
      duration: 120,
      overview: 'Test movie overview',
    });
  });

  it('should reset the form to initial state when movie is not provided', async () => {
    render(<MovieForm movie={null} genres={mockGenres} onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText('Title'), 'Test Movie');
    await user.type(screen.getByLabelText('Release Date'), '2023-09-18');
    await user.type(screen.getByLabelText('Movie Url'), 'https://example.com/movie.jpg');
    await user.type(screen.getByLabelText('Rating'), '8.5');
    await user.click(screen.getByLabelText('Genre'));
    await user.click(screen.getByText('Drama'));
    await user.type(screen.getByLabelText('Duration'), '120');
    await user.type(screen.getByLabelText('Overview'), 'Test movie overview');

    await user.click(screen.getByText('Reset'));

    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Release Date')).toHaveValue('');
    expect(screen.getByLabelText('Movie Url')).toHaveValue('');
    expect(screen.getByLabelText('Rating')).toHaveValue(null);
    expect(screen.getByLabelText('Duration')).toHaveValue(null);
    expect(screen.getByLabelText('Overview')).toHaveValue('');
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Movie } from '../../models/Movie';
import MovieForm from './MovieForm';

describe(MovieForm, () => {
  const user = userEvent.setup();
  const mockOnSubmit = jest.fn();
  const mockGenres = ['Action', 'Drama', 'Comedy'];
  const movieMock: Movie = {
    id: '1',
    title: 'Pulp Fiction',
    genres: ['Action', 'Adventure'],
    releaseDate: '2004-12-29',
    posterUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg',
    rating: 8.9,
    duration: 154,
    overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra'
  };

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
    await user.type(screen.getByLabelText('Release Date'), '2020-12-23');
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
      releaseDate: '2020-12-23',
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

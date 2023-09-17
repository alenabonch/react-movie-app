import { render, screen } from '@testing-library/react';
import React from 'react';
import { genresMock } from '../../mocks/Genre';
import { movieMock } from '../../mocks/Movie';
import MovieForm from './MovieForm';

describe(MovieForm, () => {
  const onSubmit = jest.fn();
  const genres = genresMock;

  it('should render empty movie form', () => {
    render(<MovieForm genres={genres} onSubmit={onSubmit} movie={null}/>);
    expect(screen.getByLabelText('Title')).toHaveValue('');
    expect(screen.getByLabelText('Release Date')).toHaveValue('');
    expect(screen.getByLabelText('Movie Url')).toHaveValue('');
    expect(screen.getByLabelText('Rating')).toHaveValue(0);
    expect(screen.getByLabelText('Duration')).toHaveValue(0);
    expect(screen.getByLabelText('Overview')).toHaveValue('');
    expect(screen.getByLabelText('Genre')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Reset'})).toBeInTheDocument()
  });

  it('should render movie form with provided values', () => {
    render(<MovieForm genres={genres} onSubmit={onSubmit} movie={movieMock}/>);
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
});

import { render, screen } from '@testing-library/react';
import React from 'react';
import { genresMock } from '../../mocks/Genre';
import { movieMock } from '../../mocks/Movie';
import Header from './Header';


describe(Header, () => {
  const onSearch = jest.fn();
  const onSelectedMovieReset = jest.fn();
  const onAddMovieSubmit = jest.fn();
  const queryMock = 'Text';

  it('should render header with search bar by default', () => {
    render(<Header selectedMovie={null}
                   onSearch={onSearch}
                   genres={genresMock}
                   query={queryMock}
                   onAddMovieSubmit={onAddMovieSubmit}
                   onSelectedMovieReset={onSelectedMovieReset}/>);
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
    expect(screen.getByLabelText('Find your movie')).toBeInTheDocument();
  });

  it('should render header with movie details when movie selected', () => {
    render(<Header selectedMovie={movieMock}
                   onSearch={onSearch}
                   genres={genresMock}
                   query={queryMock}
                   onAddMovieSubmit={onAddMovieSubmit}
                   onSelectedMovieReset={onSelectedMovieReset}/>);
    expect(screen.queryByText('+ Add Movie')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Return to Search')).toBeInTheDocument();
    expect(screen.getByText(movieMock.title)).toBeInTheDocument();
  });
});

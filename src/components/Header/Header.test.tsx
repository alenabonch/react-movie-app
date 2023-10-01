import { render, screen } from '@testing-library/react';
import React from 'react';
import { genresMock } from '../../mocks/Genre';
import Header from './Header';


describe(Header, () => {
  const onSearch = jest.fn();
  const onSelectedMovieReset = jest.fn();
  const onAddMovieSubmit = jest.fn();
  const queryMock = 'Text';

  it('should render Add Movie button when movie is not selected', () => {
    render(<Header onSearch={onSearch}
                   selectedMovieId={null}
                   genres={genresMock}
                   query={queryMock}
                   onAddMovieSubmit={onAddMovieSubmit}
                   onSelectedMovieReset={onSelectedMovieReset}/>);
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
  });

  it('should render Return to Search button when movie is selected', () => {
    render(<Header onSearch={onSearch}
                   selectedMovieId="1"
                   genres={genresMock}
                   query={queryMock}
                   onAddMovieSubmit={onAddMovieSubmit}
                   onSelectedMovieReset={onSelectedMovieReset}/>);
    expect(screen.queryByText('+ Add Movie')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Return to Search')).toBeInTheDocument();
  });
});

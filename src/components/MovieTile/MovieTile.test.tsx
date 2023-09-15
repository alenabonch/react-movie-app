import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Movie } from '../../models/Movie';
import MovieTile from './MovieTile';

describe(MovieTile, () => {
  const movieInfo: Movie = {
    id: '1',
    title: 'Pulp Fiction',
    genres: ['Action', 'Adventure'],
    releaseDate: '2004',
    imageUrl: 'https://image.jpg',
    rating: 8.9,
    duration: '2h 34m',
    description: 'Good movie',
  };
  const onClick = jest.fn();
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  it('should render movie tile with provided info', () => {
    render(<MovieTile movie={movieInfo} onClick={onClick} onEdit={onEdit} onDelete={onDelete}/>);
    expect(screen.getByRole('img')).toHaveAttribute('src', movieInfo.imageUrl);
    expect(screen.getByText('Pulp Fiction')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
  });

  it('should call onSelect prop with movie id', () => {
    render(<MovieTile movie={movieInfo} onClick={onClick} onEdit={onEdit} onDelete={onDelete}/>);
    userEvent.click(screen.getByTestId('movie-tile'));
    expect(onClick).toHaveBeenCalledWith(movieInfo);
  });

  it('should call onEdit prop with movie id', () => {
    render(<MovieTile movie={movieInfo} onClick={onClick} onEdit={onEdit} onDelete={onDelete}/>);
    act(() => {
      screen.getByLabelText('Options', {selector: 'button'}).click();
    });
    act(() => {
      screen.getByText('Edit').click();
    });
    expect(onEdit).toHaveBeenCalledWith(movieInfo);
  });

  it('should open Delete Movie dialog on delete option click and call onDelete prop on Confirm', () => {
    render(<MovieTile movie={movieInfo} onClick={onClick} onEdit={onEdit} onDelete={onDelete}/>);
    act(() => {
      screen.getByLabelText('Options', {selector: 'button'}).click();
    });
    act(() => {
      screen.getByText('Delete').click();
    });
    expect(screen.getByText('Delete Movie')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();
    const confirmButton = (screen.getByRole('button', {name: 'Confirm'}));
    expect(confirmButton).toBeInTheDocument();
    act(() => {
      confirmButton.click();
    });
    expect(onDelete).toHaveBeenCalledWith(movieInfo.id);
  });
});

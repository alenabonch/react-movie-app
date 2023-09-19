import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import GenreSelect from './GenreSelect';

describe(GenreSelect, () => {
  const user = userEvent.setup();
  const genres = ['Action', 'Comedy', 'Drama'];
  const initialSelectedGenre = 'Comedy';
  const onSelect = jest.fn();

  it('should render all genres passed in props', () => {
    render(<GenreSelect genres={genres} initialSelectedGenre={initialSelectedGenre} onSelect={onSelect}/>);
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    })
  });

  it('should highlight selected genre passed in props', () => {
    render(<GenreSelect genres={genres} initialSelectedGenre={initialSelectedGenre} onSelect={onSelect}/>);
    const comedyButton = screen.getByText('Comedy');
    expect(comedyButton).toHaveClass('active');
  });

  it('should highlight clicked genre and call onSelect prop with proper genre', async () => {
    render(<GenreSelect genres={genres} initialSelectedGenre={initialSelectedGenre} onSelect={onSelect}/>);
    const dramaButton = screen.getByText('Drama');
    expect(dramaButton).not.toHaveClass('active');

    await user.click(dramaButton);
    expect(dramaButton).toHaveClass('active');
    expect(onSelect).toHaveBeenCalledWith('Drama');
  });
});

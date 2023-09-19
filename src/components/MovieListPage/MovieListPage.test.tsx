import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MovieListPage from './MovieListPage';

describe(MovieListPage, () => {
  const user = userEvent.setup();

  it('should render movie list page', () => {
    render(<MovieListPage/>);
    expect(screen.getByText('+ Add Movie')).toBeInTheDocument();
    expect(screen.getByLabelText('Find your movie')).toBeInTheDocument();
  });

  it('should highlight selected genre', async () => {
    render(<MovieListPage/>);
    const dramaButton = screen.getByText('Drama');
    expect(dramaButton).not.toHaveClass('active');

    await user.click(dramaButton);
    expect(dramaButton).toHaveClass('active');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchForm from './SearchForm';

describe(SearchForm, () => {
  const user = userEvent.setup();
  const onSearch = jest.fn();

  it('should render input with initial value', () => {
    render(<SearchForm initialQuery="hi" onSearch={onSearch}/>);
    const inputElement = screen.getByLabelText('Find your movie');
    expect(inputElement).toHaveValue('hi');
  });

  it('should call onSearch prop with proper value on Search button click', async () => {
    render(<SearchForm initialQuery="" onSearch={onSearch}/>);
    const searchInput = screen.getByLabelText('Find your movie');
    const searchButton = screen.getByRole('button', {name: 'Search'});

    await user.type(searchInput, 'Inception');
    await user.click(searchButton);
    expect(onSearch).toHaveBeenCalledWith('Inception');
  });

  it('should call onSearch prop with proper value on Enter key press', async () => {
    render(<SearchForm initialQuery="" onSearch={onSearch}/>);
    const searchInput = screen.getByLabelText('Find your movie');

    await user.type(searchInput, 'Inception');
    fireEvent.keyDown(searchInput, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(onSearch).toHaveBeenCalledWith('Inception');
  });
});

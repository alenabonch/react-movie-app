import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchForm from './SearchForm';

const onSearch = jest.fn();

const mockContextData = {initialQuery: 'hi', onSearch};
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => mockContextData
}));

describe(SearchForm, () => {
  const user = userEvent.setup();

  it('should render input with initial value', () => {
    render(<SearchForm/>);
    const inputElement = screen.getByLabelText('Find your movie');
    expect(inputElement).toHaveValue('hi');
  });

  it('should call onSearch prop with proper value on Search button click', async () => {
    render(<SearchForm/>);
    const searchInput = screen.getByLabelText('Find your movie');
    const searchButton = screen.getByRole('button', {name: 'Search'});

    await user.type(searchInput, ' there');
    await user.click(searchButton);
    expect(onSearch).toHaveBeenCalledWith('hi there');
  });

  it('should call onSearch prop with proper value on Enter key press', async () => {
    render(<SearchForm/>);
    const searchInput = screen.getByLabelText('Find your movie');

    await user.type(searchInput, ' there');
    fireEvent.keyDown(searchInput, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(onSearch).toHaveBeenCalledWith('hi there');
  });

  it('should clear search on clear icon click', async () => {
    render(<SearchForm/>);
    const clearSearch = screen.getByLabelText('Clear Search');
    const searchInput = screen.getByLabelText('Find your movie');

    await user.click(clearSearch);
    expect(searchInput).toHaveValue('')
    expect(onSearch).toHaveBeenCalledWith('');
  });
});

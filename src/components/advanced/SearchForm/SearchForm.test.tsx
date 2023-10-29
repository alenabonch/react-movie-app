import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import SearchForm from './SearchForm';

const routes = [
  {
    path: '/test',
    element: <SearchForm/>,
  },
];

describe(SearchForm, () => {
  const user = userEvent.setup();

  it('should render input with initial search query', () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test?query=hi']});
    render(<RouterProvider router={router}/>);
    const inputElement = screen.getByLabelText('Find your movie');
    expect(inputElement).toHaveValue('hi');
  });

  it('should change search input', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test?query=hi']});
    render(<RouterProvider router={router} />);
    const searchInput = screen.getByLabelText('Find your movie');
    const searchButton = screen.getByRole('button', {name: 'Search'});

    await user.type(searchInput, ' there');
    await user.click(searchButton);
    expect(searchInput).toHaveValue('hi there')
  });

  it('should change search input and Enter key press', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test?query=hi']});
    render(<RouterProvider router={router}/>);
    const searchInput = screen.getByLabelText('Find your movie');

    await user.type(searchInput, ' there');
    fireEvent.keyDown(searchInput, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(searchInput).toHaveValue('hi there')
  });

  it('should clear search on clear icon click', async () => {
    const router = createMemoryRouter(routes, {initialEntries: ['/test?query=hi']});
    render(<RouterProvider router={router}/>);
    const clearSearch = screen.getByLabelText('Clear Search');
    const searchInput = screen.getByLabelText('Find your movie');

    await user.click(clearSearch);
    expect(searchInput).toHaveValue('')
  });
});

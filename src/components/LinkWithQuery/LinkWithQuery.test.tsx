import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { LinkWithQuery } from './LinkWithQuery';

it('LinkWithQuery component', async () => {
  const routes = [
    {
      path: '/test',
      element: <LinkWithQuery to='/destination'>Link Text</LinkWithQuery>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/test?param1=value1&param2=value2'],
    initialIndex: 1,
  });

  render(<RouterProvider router={router}/>);

  await waitFor(() => screen.getByText('Link Text'));

  const link = screen.getByText('Link Text');
  expect(link).toHaveAttribute('href', '/destination?param1=value1&param2=value2');
});

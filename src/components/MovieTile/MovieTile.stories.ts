import type { Meta, StoryObj } from '@storybook/react';

import MovieTile from './MovieTile';

const meta = {
  title: 'Components/MovieTile',
  component: MovieTile,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MovieTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    movieInfo: {
      id: '1',
      name: 'Pulp Fiction',
      genres: ['Action', 'Adventure'],
      year: '2004',
      imageUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg'},
  },
};

export const LongNames: Story = {
  args: {
    movieInfo: {
      id: '1',
      name: 'Pulp Fiction Pulp Fiction Pulp Fiction',
      genres: ['Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure'],
      year: '2004',
      imageUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg'},
  },
};

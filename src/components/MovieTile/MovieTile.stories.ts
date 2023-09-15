import type { Meta, StoryObj } from '@storybook/react';
import { movieMock } from '../../mocks/Movie';

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
    movie: movieMock,
  }
};

export const LongNames: Story = {
  args: {
    movie: {
      ...movieMock,
      title: 'Pulp Fiction Pulp Fiction Pulp Fiction',
      genres: ['Action', 'Adventure', 'Action', 'Adventure', 'Action', 'Adventure'],
    }
  },
};

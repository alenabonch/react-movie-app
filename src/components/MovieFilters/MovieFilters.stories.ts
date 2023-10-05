import type { Meta, StoryObj } from '@storybook/react';
import { genresMock } from '../../mocks/Genre';
import MovieFilters from './MovieFilters';

const meta = {
  title: 'Components/MovieFilters',
  component: MovieFilters,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    genres: genresMock,
  }
};

export const LoadingState: Story = {
  args: {
    genres: genresMock,
  }
};

export const ErrorState: Story = {
  args: {
    genres: genresMock,
  }
};

import type { Meta, StoryObj } from '@storybook/react';
import MovieListPage from './MovieListPage';

const meta = {
  title: 'Components/MovieListPage',
  component: MovieListPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
  }
};

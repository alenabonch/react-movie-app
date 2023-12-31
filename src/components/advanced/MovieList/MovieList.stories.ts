import type { Meta, StoryObj } from '@storybook/react';
import { movieMock, movieMock2, movieMock3 } from '../../../data/mocks/Movie';
import MovieList from './MovieList';

const meta = {
  title: 'Components/MovieList',
  component: MovieList,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    movies: [movieMock, movieMock2, movieMock3],
    loading: false,
    error: false,
    page: 0,
    totalPages: 10,
    totalAmount: 30,
  }
};

export const LoadingState: Story = {
  args: {
    movies: [],
    loading: true,
    error: false,
    page: 1,
    totalPages: 0,
    totalAmount: 0,
  }
};

export const ErrorState: Story = {
  args: {
    movies: [],
    loading: false,
    error: true,
    page: 0,
    totalPages: 0,
    totalAmount: 0,
  }
};

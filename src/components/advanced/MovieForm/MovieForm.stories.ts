import type { Meta, StoryObj } from '@storybook/react';
import { genresMock } from '../../../data/mocks/Genre';
import { movieMock } from '../../../data/mocks/Movie';
import MovieForm from './MovieForm';


const meta = {
  title: 'Components/MovieForm',
  component: MovieForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MovieForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    movie: null,
    genres: genresMock,
    error: null,
    loading: false,
  },
};

export const Filled: Story = {
  args: {
    movie: movieMock,
    genres: genresMock,
    error: null,
    loading: false,
  },
};

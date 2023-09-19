import type { Meta, StoryObj } from '@storybook/react';
import { genresMock } from '../../mocks/Genre';
import { movieMock } from '../../mocks/Movie';
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
  },
};

export const filled: Story = {
  args: {
    movie: movieMock,
    genres: genresMock,
  },
};

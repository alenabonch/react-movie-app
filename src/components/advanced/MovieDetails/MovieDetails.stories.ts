import type { Meta, StoryObj } from '@storybook/react';
import { movieMock } from '../../../data/mocks/Movie';
import MovieDetails from './MovieDetails';


const meta = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    movie: movieMock,
  }
};

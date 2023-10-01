import type { Meta, StoryObj } from '@storybook/react';
import { genresMock } from '../../mocks/Genre';
import Header from './Header';


const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    query: '',
    genres: genresMock,
    selectedMovieId: null,
  },
};

export const MovieSelected: Story = {
  args: {
    query: 'Inception',
    genres: genresMock,
    selectedMovieId: '1'
  },
};

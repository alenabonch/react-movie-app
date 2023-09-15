import type { Meta, StoryObj } from '@storybook/react';
import { movieMock } from '../../mocks/Movie';
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
    selectedMovie: null,
  },
};

export const MovieSelected: Story = {
  args: {
    selectedMovie: movieMock,
  },
};

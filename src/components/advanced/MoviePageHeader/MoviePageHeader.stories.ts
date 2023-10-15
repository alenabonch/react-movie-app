import type { Meta, StoryObj } from '@storybook/react';
import MoviePageHeader from './MoviePageHeader';


const meta = {
  title: 'Components/MoviePageHeader',
  component: MoviePageHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MoviePageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
  },
};


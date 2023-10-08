import type { Meta, StoryObj } from '@storybook/react';
import EditMovieForm from './EditMovieForm';


const meta = {
  title: 'Components/EditMovieForm',
  component: EditMovieForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EditMovieForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
  },
};

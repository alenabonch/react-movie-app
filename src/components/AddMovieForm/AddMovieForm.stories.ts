import type { Meta, StoryObj } from '@storybook/react';
import AddMovieForm from './AddMovieForm';


const meta = {
  title: 'Components/AddMovieForm',
  component: AddMovieForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddMovieForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
  },
};

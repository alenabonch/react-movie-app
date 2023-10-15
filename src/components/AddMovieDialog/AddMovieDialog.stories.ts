import type { Meta, StoryObj } from '@storybook/react';
import AddMovieDialog from './AddMovieDialog';


const meta = {
  title: 'Components/AddMovieDialog',
  component: AddMovieDialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddMovieDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
  },
};

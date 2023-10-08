import type { Meta, StoryObj } from '@storybook/react';
import DeleteMovieDialog from './DeleteMovieDialog';


const meta = {
  title: 'Components/EditMovieForm',
  component: DeleteMovieDialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DeleteMovieDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
  },
};

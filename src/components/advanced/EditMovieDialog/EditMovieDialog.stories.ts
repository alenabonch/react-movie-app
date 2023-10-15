import type { Meta, StoryObj } from '@storybook/react';
import EditMovieDialog from './EditMovieDialog';


const meta = {
  title: 'Components/EditMovieDialog',
  component: EditMovieDialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EditMovieDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
  },
};

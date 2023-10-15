import type { Meta, StoryObj } from '@storybook/react';
import SortOrderControl from './SortOrderControl';

const meta = {
  title: 'Components/SortOrder',
  component: SortOrderControl,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SortOrderControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Asc: Story = {
  args: {
    sortOrder: 'asc'
  },
};

export const Desc: Story = {
  args: {
    sortOrder: 'desc'
  },
};

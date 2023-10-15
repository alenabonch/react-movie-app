import type { Meta, StoryObj } from '@storybook/react';
import SortControl from './SortControl';

const meta = {
  title: 'Components/SortControl',
  component: SortControl,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SortControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    sort: 'title'
  },
};

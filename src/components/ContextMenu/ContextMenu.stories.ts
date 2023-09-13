import type { Meta, StoryObj } from '@storybook/react';
import ContextMenu from './ContextMenu';


const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    options: ['Edit', 'Delete']
  },
};

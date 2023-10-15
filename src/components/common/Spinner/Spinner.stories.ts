import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small'
  }
};

export const Medium: Story = {
  args: {
    size: 'medium'
  }
};

export const Large: Story = {
  args: {
    size: 'large'
  }
};

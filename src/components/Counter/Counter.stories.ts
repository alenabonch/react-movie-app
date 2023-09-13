import type { Meta, StoryObj } from '@storybook/react';

import Counter from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    initialValue: 0
  },
};

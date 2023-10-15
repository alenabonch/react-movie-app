import type { Meta, StoryObj } from '@storybook/react';
import PageNotFound from './PageNotFound';

const meta = {
  title: 'Components/PageNotFound',
  component: PageNotFound,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
  }
};

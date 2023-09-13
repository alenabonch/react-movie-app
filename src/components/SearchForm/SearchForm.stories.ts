import type { Meta, StoryObj } from '@storybook/react';

import SearchForm from './SearchForm';

const meta = {
  title: 'Components/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithQuery: Story = {
  args: {
    initialQuery: 'Inception'
  },
};

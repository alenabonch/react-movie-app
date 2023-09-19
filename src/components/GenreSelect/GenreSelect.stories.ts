import type { Meta, StoryObj } from '@storybook/react';

import GenreSelect from './GenreSelect';

const meta = {
  title: 'Components/GenreSelect',
  component: GenreSelect,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GenreSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    selectedGenre: 'Comedy',
    genres: ['Action', 'Comedy', 'Drama'],
  },
};

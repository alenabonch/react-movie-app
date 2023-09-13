import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from './MovieDetails';


const meta = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    movieDetails: {
      id: '1',
      name: 'Pulp Fiction',
      genres: ['Action', 'Adventure'],
      year: '2004',
      imageUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg',
      rating: 8.9,
      duration: '2h 34m',
      description: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra'
    },
  }
};

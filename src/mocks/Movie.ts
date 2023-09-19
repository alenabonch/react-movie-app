import { Movie } from '../models/Movie';

export const movieMock: Movie = {
  id: '1',
  title: 'Pulp Fiction',
  genres: ['Action', 'Adventure'],
  releaseDate: '2004-12-29',
  posterUrl: 'https://cdn.europosters.eu/image/1300/posters/pulp-fiction-cover-i1288.jpg',
  rating: 8.9,
  duration: 154,
  overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra'
};

export const movieMock2: Movie = {
  id: '2',
  title: 'Bohemian Rhapsody',
  genres: ['Drama', 'Biography', 'Music'],
  releaseDate: '2003',
  posterUrl: 'https://m.media-amazon.com/images/I/71kuEWe9PYL._SY445_.jpg',
  rating: 7.8,
  duration: 128,
  overview: 'Bohemian Rhapsody is a 2018 biographical musical drama film that focuses on the life of Freddie Mercury, the lead singer of the British rock band Queen, from the formation of the band in 1970 to their 1985 Live Aid performance at the original Wembley Stadium.',
};

export const movieMock3: Movie = {
  id: '3',
  title: 'Inception',
  genres: ['Action', 'Adventure'],
  releaseDate: '2003',
  posterUrl: 'https://m.media-amazon.com/images/I/61xzvfJiNkL._AC_.jpg',
  rating: 9.3,
  duration: 124,
  overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
}

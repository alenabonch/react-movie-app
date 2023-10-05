import axios, { CancelToken, CancelTokenSource } from 'axios'
import { Movie, MoviesRequest, MoviesResponse, MoviesResponseDto } from '../models/Movie';
import MovieService from './MovieService';

jest.mock('axios');

describe(MovieService, () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockMoviesRequest: MoviesRequest = {
    sortBy: 'release_date',
    search: 'text',
    searchBy: 'title',
    sortOrder: 'asc',
    filter: 'Comedy',
    offset: '5',
    limit: '10',
  };

  const movieDto = {
    id: 1,
    title: 'title',
    release_date: '1998-12-23',
    poster_path: 'poster.jpg',
    genres: ['Comedy', 'Action'],
    vote_average: 5,
    runtime: 86,
    overview: 'overview',
    revenue: 0,
    budget: 15,
    tagline: 'tag',
    vote_count: 6
  };

  const moviesResponseDto: MoviesResponseDto = {
    data: [movieDto],
    limit: 10,
    offset: 5,
    totalAmount: 100,
  };

  describe('Get Movies', () => {
    it('should get movies and transform movie dto', async () => {
      const expectedMoviesResponse: MoviesResponse = {
        data: [{
          id: '1',
          title: 'title',
          releaseDate: '1998-12-23',
          posterUrl: 'poster.jpg',
          genres: ['Comedy', 'Action'],
          duration: 86,
          overview: 'overview',
          rating: 5,
        }],
        limit: 10,
        offset: 5,
        totalAmount: 100,
      }

      jest.spyOn(mockedAxios, 'get').mockResolvedValue({data: moviesResponseDto});
      const cancelToken = {reason: {message: 'user canceled'}} as CancelToken;
      const data = await MovieService.getMovies(mockMoviesRequest, cancelToken);
      const params = mockMoviesRequest;

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/movies', {params, cancelToken});
      expect(data).toEqual(expectedMoviesResponse);
    });
  });

  describe('Get Movie', () => {
    it('should get movie and transform movie dto', async () => {
      const expectedMoviesResponse: Movie = {
        id: '1',
        title: 'title',
        releaseDate: '1998-12-23',
        posterUrl: 'poster.jpg',
        genres: ['Comedy', 'Action'],
        duration: 86,
        overview: 'overview',
        rating: 5,
      }

      jest.spyOn(mockedAxios, 'get').mockResolvedValue({data: movieDto});
      const cancelToken = {reason: {message: 'user canceled'}} as CancelToken;
      const data = await MovieService.getMovie('1', cancelToken);

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/movies/1', {cancelToken});
      expect(data).toEqual(expectedMoviesResponse);
    });
  });
});

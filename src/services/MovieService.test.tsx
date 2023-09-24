import axios, { CancelTokenSource } from 'axios'
import { MoviesRequest, MoviesResponse, MoviesResponseDto } from '../models/Movie';
import MovieService from './MovieService';

jest.mock('axios');

describe(MovieService, () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let service: MovieService;

  const mockMoviesRequest: MoviesRequest = {
    sortBy: 'release_date',
    search: 'text',
    searchBy: 'title',
    sortOrder: 'asc',
    filter: 'Comedy',
    offset: '5',
    limit: '10',
  };

  const moviesResponseDto: MoviesResponseDto = {
    data: [{
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
    }],
    limit: 10,
    offset: 5,
    totalAmount: 100,
  };

  beforeEach(() => {
    service = new MovieService();
  });

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
      const cancelToken = {cancel: jest.fn(), token: {reason: {message: 'user canceled'}}} as unknown as CancelTokenSource;
      jest.spyOn(mockedAxios.CancelToken, 'source').mockReturnValueOnce(cancelToken);

      const data = await service.getMovies(mockMoviesRequest);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/movies', {
        params: mockMoviesRequest,
        cancelToken: cancelToken.token
      });
      expect(data).toEqual(expectedMoviesResponse);
    });

    it('should cancel if cancel token exists', async () => {
      jest.spyOn(mockedAxios, 'get').mockResolvedValue({data: moviesResponseDto});
      const cancelToken = {cancel: jest.fn(), token: {reason: {message: 'user canceled'}}} as unknown as CancelTokenSource;
      jest.spyOn(mockedAxios.CancelToken, 'source').mockReturnValue(cancelToken);

      await service.getMovies({search: 'black'});
      expect(mockedAxios.get).toBeCalledWith('http://localhost:4000/movies', {
        params: {search: 'black'},
        cancelToken: cancelToken.token
      });
      expect(mockedAxios.CancelToken.source).toBeCalledTimes(1);

      await service.getMovies({search: 'black box'});
      expect(cancelToken.cancel).toBeCalledTimes(1);
      expect(mockedAxios.get).toBeCalledWith('http://localhost:4000/movies', {
        params: {search: 'black box'},
        cancelToken: cancelToken.token
      });
    });
  });
});

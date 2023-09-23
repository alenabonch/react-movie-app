import axios from 'axios'
import { MoviesRequest, MoviesResponse, MoviesResponseDto } from '../models/Movie';
import MovieService from './MovieService';

jest.mock('axios');

describe(MovieService, () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let service: MovieService;

  beforeEach(() => {
    service = new MovieService();
  });

  it('should get movies and transform movie dto', async () => {
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

    mockedAxios.get.mockReturnValueOnce(Promise.resolve({data: moviesResponseDto}));
    const data = await service.getMovies(mockMoviesRequest);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/movies', {params: mockMoviesRequest});
    expect(data).toEqual(expectedMoviesResponse);
  });
});

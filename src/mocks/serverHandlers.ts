import { Movie, MovieDto, MoviesResponse } from 'models/Movie'
import { AsyncResponseResolverReturnType, MockedResponse, rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:4000/movies', getMoviesResolver),
  rest.get('http://localhost:4000/movies/1', getMovieResolver),
  rest.post('http://localhost:4000/movies', createMovieResolver),
  rest.put('http://localhost:4000/movies', updatedMovieResolver),
  rest.delete('http://localhost:4000/movies/1', deleteMovieResolver),
]

function getMoviesResolver(req: any, res: any, ctx: any): AsyncResponseResolverReturnType<MockedResponse<MoviesResponse>> {
  const moviesResponse: MoviesResponse = {
    data: [{
      id: '1',
      title: 'Cats',
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
    totalPages: 10,
  }
  return res(ctx.json(moviesResponse))
}

function getMovieResolver(req: any, res: any, ctx: any): AsyncResponseResolverReturnType<MockedResponse<Movie>> {
  const movieResponse: Movie = {
    id: '1',
    title: 'Cats',
    releaseDate: '1998-12-23',
    posterUrl: 'poster.jpg',
    genres: ['Comedy', 'Action'],
    duration: 86,
    overview: 'overview',
    rating: 5,
  }
  return res(ctx.json(movieResponse))
}

function createMovieResolver(req: any, res: any, ctx: any): AsyncResponseResolverReturnType<MockedResponse<MovieDto>> {
  const createdMovie = {
    id: 2,
    title: 'Dogs',
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
  return res(ctx.json(createdMovie))
}

function updatedMovieResolver(req: any, res: any, ctx: any): AsyncResponseResolverReturnType<MockedResponse<MovieDto>> {
  const updatedMovie = {
    id: 1,
    title: 'Lions',
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
  return res(ctx.json(updatedMovie))
}

function deleteMovieResolver(req: any, res: any, ctx: any): AsyncResponseResolverReturnType<MockedResponse<{}>> {
  return res(ctx.json({}))
}

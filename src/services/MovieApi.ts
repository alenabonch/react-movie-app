import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieDraft, MovieDto, MoviesRequest, MoviesResponse, MoviesResponseDto } from 'models/Movie';
import { transformDtoToMovie, transformMovieToDto } from 'utils/MovieUtils';
import { getPageCount } from '../utils/PageUtils';


export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
  tagTypes: ['Movies', 'Movie'],
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, MoviesRequest>({
      query: (params: MoviesRequest) => ({
        url: '/movies',
        params
      }),
      transformResponse(response: MoviesResponseDto): MoviesResponse {
        const data: Movie[] = response.data.map(transformDtoToMovie);
        return {...response, data, totalPages: getPageCount(response.totalAmount, response.limit)}
      },
      providesTags: ['Movies'],
    }),
    getMovie: builder.query<Movie, string>({
      query: (movieId) => ({
        url: `movies/${movieId}`,
      }),
      transformResponse(response: MovieDto): Movie {
        return transformDtoToMovie(response)
      },
      providesTags: (result, error, id) => [{type: 'Movies', id}],
    }),
    addMovie: builder.mutation<Movie, MovieDraft>({
      query: (movie) => ({
        url: '/movies',
        method: 'POST',
        body: transformMovieToDto(movie)
      }),
      transformResponse(response: MovieDto): Movie {
        return transformDtoToMovie(response)
      },
      invalidatesTags: (result) => result ? ['Movies'] : [],
    }),
    updateMovie: builder.mutation<Movie, Movie>({
      query: (movie) => ({
        url: '/movies',
        method: 'PUT',
        body: {...transformMovieToDto(movie), id: Number(movie.id)}
      }),
      transformResponse(response: MovieDto): Movie {
        return transformDtoToMovie(response)
      },
      invalidatesTags: (result) => result ? ['Movies'] : [],
    }),
    deleteMovie: builder.mutation<void, string>({
      query: (movieId) => ({
        url: `movies/${movieId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Movies']
    }),
  }),
})

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation
} = movieApi

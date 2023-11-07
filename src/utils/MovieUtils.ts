import { AddOrUpdateMovieServerError, Movie, MovieDraft, MovieDraftDto, MovieDto, MoviesRequest, SortBy, SortOrder } from '../models/Movie';

export function prepareRequestParams(search: string, sortBy: SortBy, sortOrder: SortOrder, page: number, genre: string): MoviesRequest {
  const limit = 6;
  return {
    search,
    searchBy: 'title',
    sortBy: sortBy,
    sortOrder: sortOrder,
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
    filter: genre !== 'All' ? genre : ''
  }
}

export function transformDtoToMovie(dto: MovieDto): Movie {
  return {
    id: dto.id.toString(),
    title: dto.title,
    releaseDate: dto.release_date,
    posterUrl: dto.poster_path,
    genres: dto.genres,
    overview: dto.overview,
    rating: dto.vote_average,
    duration: dto.runtime
  }
}

export function transformMovieToDto(movie: Movie | MovieDraft): MovieDraftDto {
  return {
    title: movie.title,
    release_date: movie.releaseDate,
    poster_path: movie.posterUrl,
    genres: movie.genres,
    overview: movie.overview,
    vote_average: movie.rating,
    runtime: movie.duration,
  };
}

export function isAddOrUpdateMovieError(error: unknown): error is AddOrUpdateMovieServerError {
  return typeof error === 'object' && error != null && 'status' && 'data' in error
}

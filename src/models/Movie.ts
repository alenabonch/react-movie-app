export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  posterUrl: string;
  genres: string[];
  rating: number;
  duration: number;
  overview: string;
}

export type MovieDraft = Omit<Movie, 'id'> ;

export interface MovieDto {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: string[];
  vote_average: number;
  runtime: number;
  overview: string;
  revenue?: number;
  budget?: number;
  tagline?: string;
  vote_count?: number;
}

export type MovieDraftDto = Omit<MovieDto, 'id'> ;

export interface MoviesResponseDto {
  data: MovieDto[];
  limit: number;
  offset: number;
  totalAmount: number;
}

export interface MoviesResponse {
  data: Movie[];
  limit: number;
  offset: number;
  totalAmount: number;
}

export type SortBy = 'title' | 'release_date';
export type SearchBy = 'title' | 'genres';
export type SortOrder = 'asc' | 'desc';

export interface MoviesRequest {
  sortBy?: SortBy;
  search?: string;
  searchBy?: SearchBy;
  sortOrder?: SortOrder;
  filter?: string;
  offset?: string;
  limit?: string;
}

export interface CreateMovieServerError {
  response: {
    data: {
      messages: string[];
    }
  }
}

export interface IMovieForm {
  id: string;
  title: string;
  releaseDate: Date | null;
  posterUrl: string;
  genres: string[];
  rating: string | null;
  duration: string | null;
  overview: string;
}

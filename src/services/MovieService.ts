import axios, { CancelToken } from 'axios';
import { Movie, MovieDraft, MovieDraftDto, MovieDto, MoviesRequest, MoviesResponse, MoviesResponseDto } from '../models/Movie';

class MovieService {
  private static readonly MOVIES_URL = 'http://localhost:4000/movies';

  public static async getMovies(params: MoviesRequest, cancelToken?: CancelToken): Promise<MoviesResponse> {
    const response = await axios.get<MoviesResponseDto>(this.MOVIES_URL, {params, cancelToken});
    const data: Movie[] = response.data.data.map(MovieService.transformDtoToMovie);
    return {...response.data, data}
  }

  public static async getMovie(movieId: string, cancelToken?: CancelToken): Promise<Movie> {
    const response = await axios.get<MovieDto>(`${MovieService.MOVIES_URL}/${movieId}`, {cancelToken});
    return MovieService.transformDtoToMovie(response.data);
  }

  public static async createMovie(movie: MovieDraft, cancelToken?: CancelToken): Promise<Movie> {
    const movieDto = MovieService.transformMovieToDto(movie);
    const response = await axios.post<MovieDto>(`${MovieService.MOVIES_URL}`, movieDto, {cancelToken});
    return MovieService.transformDtoToMovie(response.data);
  }

  public static async updateMovie(movie: Movie, cancelToken?: CancelToken): Promise<Movie> {
    const movieDto = {...MovieService.transformMovieToDto(movie), id: Number(movie.id)};
    const response = await axios.put<MovieDto>(`${MovieService.MOVIES_URL}`, movieDto, {cancelToken});
    return MovieService.transformDtoToMovie(response.data);
  }

  public static async deleteMovie(movieId: string, cancelToken?: CancelToken): Promise<{}> {
    return axios.delete<{}>(`${MovieService.MOVIES_URL}/${movieId}`, {cancelToken});
  }

  private static transformDtoToMovie(dto: MovieDto): Movie {
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

  private static transformMovieToDto(movie: Movie | MovieDraft): MovieDraftDto {
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
}

export default MovieService;

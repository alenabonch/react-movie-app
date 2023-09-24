import axios, { CancelTokenSource } from 'axios';
import { Movie, MovieDto, MoviesRequest, MoviesResponse, MoviesResponseDto } from '../models/Movie';

export const REQUEST_CANCELLED_ERROR = 'REQUEST_CANCELLED_ERROR';

let cancelToken: CancelTokenSource;

class MovieService {
  private readonly MOVIES_URL = 'http://localhost:4000/movies';

  public async getMovies(moviesRequest: MoviesRequest): Promise<MoviesResponse> {
    if (cancelToken) {
      cancelToken.cancel();
    }

    cancelToken = axios.CancelToken.source();

    try {
      const response = await axios.get<MoviesResponseDto>(this.MOVIES_URL, {
        params: moviesRequest,
        cancelToken: cancelToken.token
      });
      const data: Movie[] = response.data.data.map(this.transformDtoToMovie);
      return {
        ...response.data,
        data
      }
    } catch(e) {
      if (axios.isCancel(e)) {
        throw REQUEST_CANCELLED_ERROR;
      }
      throw e;
    }
  }

  private transformDtoToMovie(dto: MovieDto): Movie {
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
}

export default MovieService;

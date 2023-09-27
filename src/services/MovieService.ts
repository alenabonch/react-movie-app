import axios, { CancelToken } from 'axios';
import { Movie, MovieDto, MoviesRequest, MoviesResponse, MoviesResponseDto } from '../models/Movie';

class MovieService {
  private readonly MOVIES_URL = 'http://localhost:4000/movies';

  public async getMovies(moviesRequest: MoviesRequest, cancelToken?: CancelToken): Promise<MoviesResponse> {
    const response = await axios.get<MoviesResponseDto>(this.MOVIES_URL, {
      params: moviesRequest,
      cancelToken: cancelToken
    });
    const data: Movie[] = response.data.data.map(this.transformDtoToMovie);
    return {
      ...response.data,
      data
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

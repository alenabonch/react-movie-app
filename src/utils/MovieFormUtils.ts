import moment from 'moment/moment';
import { IMovieForm, Movie } from '../models/Movie';

export const emptyMovieForm: IMovieForm = {
  id: '',
  title: '',
  releaseDate: null,
  posterUrl: '',
  genres: [],
  rating: '0',
  duration: '0',
  overview: ''
};

export const convertFormDataToMovie = (formData: IMovieForm): Movie => {
  moment(formData.releaseDate).toISOString(true);
  return {
    ...formData,
    releaseDate: moment(formData.releaseDate).format('YYYY-MM-DD'),
    rating: Number(formData.rating),
    duration: Number(formData.duration)
  }
}

export const convertMovieToFormData = (movieData: Movie | null): IMovieForm => {
  if (movieData) {
    return {
      ...movieData,
      releaseDate: moment(movieData.releaseDate, 'YYYY-MM-DD').toDate(),
      rating: movieData.rating.toString(),
      duration: movieData.duration?.toString(),
    }
  }
  return emptyMovieForm;
}

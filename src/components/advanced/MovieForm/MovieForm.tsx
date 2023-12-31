import React from 'react';
import { AddOrUpdateMovieServerError, IMovieForm, Movie } from '../../../models/Movie';
import { convertFormDataToMovie, convertMovieToFormData } from '../../../utils/MovieFormUtils';
import Datepicker from '../../forms/Datepicker/Datepicker';
import Form from '../../forms/Form/Form';
import Input from '../../forms/Input/Input';
import MultiSelect from '../../forms/MultiSelect/MultiSelect';
import TextArea from '../../forms/TextArea/TextArea';
import styles from './MovieForm.module.scss'

const URL_PATTERN = /^https?:\/\/(?:www\.)?./;

interface MovieFormProps {
  movie: Movie | null;
  genres: string[];
  loading: boolean;
  error: AddOrUpdateMovieServerError | null;
  onSubmit: (movie: Movie) => void;
}

function MovieForm({movie, genres, loading, error, onSubmit}: MovieFormProps) {
  const defaultValues = convertMovieToFormData(movie);

  const onFormSubmit = (data: IMovieForm) => {
    onSubmit(convertFormDataToMovie(data));
  }

  return (
      <div className={styles.movieForm}>
        <Form onSubmit={onFormSubmit} defaultValues={defaultValues} loading={loading} serverErrors={error?.data.messages}>
          <div className="row mb-3">
            <div className="col-7">
              <Input name="title" label="Title" rules={{required: 'Title is required'}} data-testid="title-input"/>
            </div>

            <div className="col">
              <Datepicker name="releaseDate"
                          label="Release Date"
                          rules={{required: 'Release Date is required'}}
                          placeholder="Select Date"/>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-7">
              <Input name="posterUrl"
                     label="Movie Url"
                     rules={{
                       required: 'Movie URL is required',
                       pattern: {value: URL_PATTERN, message: 'Entered value does not match URL format'}
                     }}
                     placeholder="https://"
                     data-testid="url-input"/>
            </div>

            <div className="col">
              <Input name="rating"
                     label="Rating"
                     type="number"
                     min={0} max={10} step=".1"
                     data-testid="rating-input"/>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-7">
              <MultiSelect name="genres"
                           label="Genre"
                           rules={{required: 'At least one genre should be selected'}}
                           options={genres}
                           placeholder="Select Genre"/>
            </div>

            <div className="col">
              <Input name="duration"
                     label="Duration"
                     type="number"
                     placeholder="minutes"
                     min={0}
                     data-testid="duration-input"/>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <TextArea name="overview"
                        label="Overview"
                        rows={4}
                        placeholder="Movie Description"
                        data-testid="overview-input"/>
            </div>
          </div>
        </Form>
      </div>
  );
}

export default MovieForm;

import { Multiselect } from 'multiselect-react-dropdown';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateMovieServerError, Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import { ErrorMessage } from "@hookform/error-message"
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import './MovieForm.scss'
import Spinner from '../Spinner/Spinner';

const URL_PATTERN = /^https?:\/\/(?:www\.)?./;

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

const emptyMovieForm: IMovieForm = {
  id: '',
  title: '',
  releaseDate: null,
  posterUrl: '',
  genres: [],
  rating: '0',
  duration: '0',
  overview: ''
};

interface MovieFormProps {
  movie: Movie | null;
  genres: string[];
  loading: boolean;
  error: CreateMovieServerError | null;
  onSubmit: (movie: Movie) => void;
}

function MovieForm({movie, genres, loading, error, onSubmit}: MovieFormProps) {

  const convertFormDataToMovie = (formData: IMovieForm): Movie => {
    moment(formData.releaseDate).toISOString(true);
    return  {
      ...formData,
      releaseDate: moment(formData.releaseDate).format('YYYY-MM-DD'),
      rating: Number(formData.rating),
      duration: Number(formData.duration)
    }
  }

  const convertMovieToFormData = (movieData: Movie | null): IMovieForm => {
    if (movieData) {
      return {
        ...movieData,
        releaseDate: moment(movieData.releaseDate, 'YYYY-MM-DD').toDate(),
        rating: movieData.rating.toString(),
        duration: movieData.duration.toString(),
      }
    }
    return emptyMovieForm;
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<IMovieForm>({
    defaultValues: convertMovieToFormData(movie)
  });

  const onFormSubmit = (data: IMovieForm) => {
    onSubmit(convertFormDataToMovie(data));
  }

  const onFormReset = () => {
    reset(convertMovieToFormData(movie));
  }

  return (
      <form className="movie-form" onSubmit={handleSubmit(onFormSubmit)} autoComplete={'off'}>
        <div className="row mb-3">
          <div className="col-7">
            <label htmlFor="title">Title</label>
            <input {...register("title", {required: "Title is required"})} id="title"/>
            <ErrorMessage errors={errors} name="title" render={({ message }) => <p className="error-message">{message}</p>}/>
          </div>

          <div className="col">
            <label htmlFor="releaseDate">Release Date</label>
            <Controller
                control={control}
                name="releaseDate"
                rules={{ required: "Release Date is required" }}
                render={({field: {onChange, value}}) => (
                    <DatePicker id="releaseDate"
                                selected={value}
                                placeholderText="Select Date"
                                onChange={onChange}
                                dateFormat='yyyy-MM-dd'/>
                )}
            />
            <ErrorMessage errors={errors} name="releaseDate" render={({ message }) => <p className="error-message">{message}</p>}/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-7">
            <label htmlFor="posterUrl">Movie Url</label>
            <input {...register("posterUrl", {required: "Movie URL is required", pattern: {
                value: URL_PATTERN,
                message: "Entered value does not match URL format",
              }})} id="posterUrl" placeholder="https://"/>
            <ErrorMessage errors={errors} name="posterUrl" render={({ message }) => <p className="error-message">{message}</p>}/>
          </div>

          <div className="col">
            <label htmlFor="rating">Rating</label>
            <input {...register("rating")} id="rating" type="number" min={0} max={10} step=".1"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-7">
            <label htmlFor="genres_input">Genre</label>
            <Controller
                control={control}
                name="genres"
                rules={{ required: "At least one genre should be selected" }}
                render={({field: {onChange, value}}) => (
                    <Multiselect
                        id="genres"
                        options={genres}
                        isObject={false}
                        placeholder="Select Genre"
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                        closeOnSelect={false}
                    />
                )}
            />
            <ErrorMessage errors={errors} name="genres" render={({ message }) => <p className="error-message">{message}</p>}/>
          </div>

          <div className="col">
            <label htmlFor="duration">Duration</label>
            <input {...register("duration")} id="duration" type="number" min={0} placeholder="minutes"/>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label htmlFor="overview">Overview</label>
            <textarea {...register("overview", {required: "Overview is required"})} id="overview" rows={4} placeholder="Movie Description"/>
            <ErrorMessage errors={errors} name="overview" render={({ message }) => <p className="error-message">{message}</p>}/>
          </div>
        </div>

        {
          error && error.response.data.messages.map((message) => (
                <div className="text-danger" key={message}>{message}</div>
            ))
        }

        <div className="d-flex justify-content-end">
          { loading && <div className="mt-2 mx-2"><Spinner size="small"/></div> }
          <Button className="mx-2" onClick={onFormReset}>Reset</Button>
          <Button primary type="submit">Submit</Button>
        </div>
      </form>
  );
}

export default MovieForm;

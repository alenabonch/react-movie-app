import { Multiselect } from 'multiselect-react-dropdown';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import { ErrorMessage } from "@hookform/error-message"
import './MovieForm.scss'

export interface IMovieForm {
  id: string;
  title: string;
  releaseDate: string;
  posterUrl: string;
  genres: string[];
  rating: string | null;
  duration: string | null;
  overview: string;
}

const emptyMovieForm: IMovieForm = {
  id: '',
  title: '',
  releaseDate: '',
  posterUrl: '',
  genres: [],
  rating: null,
  duration: null,
  overview: ''
};

interface MovieFormProps {
  movie: Movie | null;
  genres: string[];
  onSubmit: (movie: Movie) => void;
}

function MovieForm({movie, genres, onSubmit}: MovieFormProps) {
  const convertFormDataToMovie = (formData: IMovieForm): Movie => {
    return  {
      ...formData,
      rating: Number(formData.rating),
      duration: Number(formData.duration)
    }
  }

  const convertMovieToFormData = (movieData: Movie | null): IMovieForm => {
    if (movieData) {
      return {
        ...movieData,
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
      <form className="movie-form" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="row mb-3">
          <div className="col-8">
            <label htmlFor="title">Title</label>
            <input {...register("title", {required: "Title is required"})} id="title"/>
            <ErrorMessage errors={errors} name="title" render={({ message }) => <p className="error-message">{message}</p>}/>
          </div>

          <div className="col">
            <label htmlFor="releaseDate">Release Date</label>
            <input {...register("releaseDate")} id="releaseDate" placeholder="YYYY-MM-DD"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-8">
            <label htmlFor="posterUrl">Movie Url</label>
            <input {...register("posterUrl")} id="posterUrl" placeholder="https://"/>
          </div>

          <div className="col">
            <label htmlFor="rating">Rating</label>
            <input {...register("rating")} id="rating" type="number" min={0} max={10} step=".1"/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-8">
            <label htmlFor="genres_input">Genre</label>
            <Controller
                control={control}
                name="genres"
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
          </div>

          <div className="col">
            <label htmlFor="duration">Duration</label>
            <input {...register("duration")} id="duration" type="number" min={0} placeholder="minutes"/>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label htmlFor="overview">Overview</label>
            <textarea {...register("overview")} id="overview" rows={4} placeholder="Movie Description"/>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Button label="Reset" className="mx-2" onClick={onFormReset}></Button>
          <Button primary label="Submit" type="submit"></Button>
        </div>
      </form>
  );
}

export default MovieForm;

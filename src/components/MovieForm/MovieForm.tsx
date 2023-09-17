import { Multiselect } from 'multiselect-react-dropdown';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import { ErrorMessage } from "@hookform/error-message"
import './MovieForm.scss'

const emptyMovie: Movie = {
  id: '',
  title: '',
  releaseDate: '',
  posterUrl: '',
  genres: [],
  rating: 0,
  duration: 0,
  overview: ''
};

interface MovieFormProps {
  movie: Movie | null;
  genres: string[];
  onSubmit: (movie: Movie) => void;
}

function MovieForm({movie, genres, onSubmit}: MovieFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<Movie>({
    defaultValues: movie ?? emptyMovie
  });

  const onFormSubmit = (data: Movie) => {
    onSubmit(data);
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
          <Button label="Reset" className="mx-2" onClick={() => reset(movie ?? emptyMovie)}></Button>
          <Button primary label="Submit" type="submit"></Button>
        </div>
      </form>
  );
}

export default MovieForm;

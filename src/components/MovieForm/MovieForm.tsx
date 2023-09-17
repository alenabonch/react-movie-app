import React, { useState } from 'react';
import { Movie } from '../../models/Movie';
import { Button } from '../Button/Button';
import './MovieForm.scss'

const emptyMovie = {
  id: '',
  title: '',
  releaseDate: '',
  posterUrl: '',
  genres: [],
  rating: '',
  duration: '',
  overview: ''
}

interface MovieFormProps {
  movie: Movie | null;
  genres: string[];
  onSubmit: (movie: Movie) => void;
}

function MovieForm({movie, genres, onSubmit}: MovieFormProps) {
  const [movieForm, setMovieForm] = useState(movie || emptyMovie);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setMovieForm({
      ...movieForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(new FormData(event.target as any));
    console.log(data)
    event.preventDefault();
    onSubmit(data as any);
  }

  const handleReset = () => {
    setMovieForm(movie || emptyMovie);
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-7">
          <label htmlFor="title">Title</label>
          <input value={movieForm.title} className="form-control" type="text" id="title" name="title" onChange={handleChange}/>
        </div>
        <div className="col">
          <label htmlFor="releaseDate">Release Date</label>
          <input value={movieForm.releaseDate} className="form-control" type="text" id="releaseDate" name="releaseDate" placeholder="yyyy.mm.dd" onChange={handleChange}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-7">
          <label htmlFor="posterUrl">Movie Url</label>
          <input value={movieForm.posterUrl} className="form-control" type="text" id="posterUrl" name="posterUrl" placeholder="https://" onChange={handleChange}/>
        </div>
        <div className="col">
          <label htmlFor="rating">Rating</label>
          <input value={movieForm.rating} className="form-control" type="text" id="rating" name="rating" placeholder="7.8" onChange={handleChange}/>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-7">
          <label htmlFor="genres">Genre</label>
          <select value={movieForm.genres} className="form-select" id="genres" name="genres" onChange={handleChange}>
            <option value="" disabled>Select Genre</option>
            {genres.map((genre) => (
                <option value={genre} key={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="duration">Runtime</label>
          <input value={movieForm.duration} className="form-control" type="text" id="duration" name="duration" placeholder="minutes"  onChange={handleChange}/>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <label htmlFor="overview">Overview</label>
          <textarea value={movieForm.overview} className="form-control" id="overview" name="overview" rows={4} placeholder="Movie Description" onChange={handleChange}/>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button label="Reset" className="mx-2" onClick={handleReset}></Button>
        <Button primary label="Submit" type="submit"></Button>
      </div>
    </form>
  );
}

export default MovieForm;

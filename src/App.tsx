import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieDetailsContainer from './components/MovieDetailsContainer/MovieDetailsContainer';
import SearchForm from './components/SearchForm/SearchForm';
import { Movie } from './models/Movie';
import MovieListPage from './pages/MovieListPage/MovieListPage';
import MovieService from './services/MovieService';

function App() {
  const movieService = new MovieService();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MovieListPage/>,
      children: [
        {
          path: '/',
          element: <SearchForm/>
        },
        {
          path: ':movieId',
          element: <MovieDetailsContainer/>,
          loader: async ({params}: any): Promise<Movie> => {
            return movieService.getMovie(params.movieId);
          }
        }
      ]
    },
  ]);

  return (
      <RouterProvider router={router}/>
  );
}

export default App;

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import MovieDetailsContainer from './components/MovieDetailsContainer/MovieDetailsContainer';
import SearchForm from './components/SearchForm/SearchForm';
import { Movie } from './models/Movie';
import MovieListPage from './pages/MovieListPage/MovieListPage';
import MovieService from './services/MovieService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieListPage/>,
    children: [
      {
        path: '/',
        element: <SearchForm/>,
        children: [
          {
            path: '/new',
            element: <AddMovieForm/>,
          }
        ]
      },
      {
        path: ':movieId',
        element: <MovieDetailsContainer/>,
        loader: async ({params}: any): Promise<Movie> => {
          return MovieService.getMovie(params.movieId);
        }
      }
    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;

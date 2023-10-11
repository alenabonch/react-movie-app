import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddMovieDialog from './components/AddMovieDialog/AddMovieDialog';
import DeleteMovieDialog from './components/DeleteMovieDialog/DeleteMovieDialog';
import EditMovieDialog from './components/EditMovieDialog/EditMovieDialog';
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
            element: <AddMovieDialog/>,
          }
        ]
      },
      {
        path: ':movieId',
        element: <MovieDetailsContainer/>,
        loader: async ({params}: any): Promise<Movie> => {
          return MovieService.getMovie(params.movieId);
        }
      },
      {
        path: ':movieId/edit',
        element: <EditMovieDialog/>,
        loader: async ({params}: any): Promise<Movie> => {
          return MovieService.getMovie(params.movieId);
        }
      },
      {
        path: ':movieId/delete',
        element: <DeleteMovieDialog/>,
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

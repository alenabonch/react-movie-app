import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddMovieDialog from './components/advanced/AddMovieDialog/AddMovieDialog';
import EditMovieDialog from './components/advanced/EditMovieDialog/EditMovieDialog';
import MovieDetailsContainer from './components/advanced/MovieDetailsContainer/MovieDetailsContainer';
import SearchForm from './components/advanced/SearchForm/SearchForm';
import { Movie } from './models/Movie';
import MovieListPage from './components/pages/MovieListPage/MovieListPage';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import MovieService from './services/MovieService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieListPage/>,
    errorElement: <PageNotFound/>,
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
      }
    ],
  },
  {
    path: '*',
    element: <PageNotFound/>,
  }
]);

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;

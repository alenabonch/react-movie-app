import { Movie } from 'models/Movie';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddMovieDialog from './components/advanced/AddMovieDialog/AddMovieDialog';
import EditMovieDialog from './components/advanced/EditMovieDialog/EditMovieDialog';
import MovieDetailsContainer from './components/advanced/MovieDetailsContainer/MovieDetailsContainer';
import SearchForm from './components/advanced/SearchForm/SearchForm';
import MovieListPage from './components/pages/MovieListPage/MovieListPage';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import { movieApi } from './services/MovieApi';
import { setupStore } from './store/store';

const store = setupStore()

async function loadMovie(id: string): Promise<Movie> {
  const getMovie = store.dispatch(movieApi.endpoints.getMovie.initiate(id));
  try {
    return getMovie.unwrap();
  } finally {
    getMovie.unsubscribe()
  }
}

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
        loader: ({params}: any): Promise<Movie> => {
          return loadMovie(params.movieId);
        }
      },
      {
        path: ':movieId/edit',
        element: <EditMovieDialog/>,
        loader: ({params}: any): Promise<Movie> => {
          return loadMovie(params.movieId);
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
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  );
}

export default App;

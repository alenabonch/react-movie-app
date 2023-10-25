import MoviesPage from '@components/advanced/MoviesPage/MovieListPage';
import React from "react";

export default async function MovieListPage({searchParams}: any) {
  return (
      <MoviesPage searchParams={searchParams}/>
  );
}

'use server';

import { MoviesRequest, MoviesResponse } from '@models/Movie';
import MovieService from '@services/MovieService';
import { revalidatePath } from 'next/cache';

export async function getMovies(params: MoviesRequest): Promise<{data?: MoviesResponse; error?: any}> {
  try {
    const data = await MovieService.getMovies(params);
    return {data};
  } catch (error) {
    return {error}
  }
}

export async function deleteMovie(movieId: string) {
  await MovieService.deleteMovie(movieId);
  revalidatePath(`/`)
}

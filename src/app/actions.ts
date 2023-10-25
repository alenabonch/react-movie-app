'use server';

import MovieService from '@services/MovieService';
import { revalidatePath } from 'next/cache';

export async function deleteMovie(movieId: string) {
  await MovieService.deleteMovie(movieId);
  revalidatePath(`/`)
}

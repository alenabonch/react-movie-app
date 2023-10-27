'use client'
import { updateUrlSearchParams } from '@utils/RouterUtils';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortBy, SortOrder } from '@models/Movie';
import GenreSelect from '../GenreSelect/GenreSelect';
import SortControl from '../SortControl/SortControl';
import SortOrderControl from '../SortOrder/SortOrderControl';

interface MovieFiltersProps {
  genres: string[]
}

function MovieFilters({genres} : MovieFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams.get('sortBy') as SortBy || 'release_date';
  const sortOrder = searchParams.get('sortOrder') as SortOrder || 'desc';
  const selectedGenre = searchParams.get('genre') || genres[0];

  const handleSort = (sortBy: SortBy) => {
    const url = updateUrlSearchParams('sortBy', sortBy);
    router.push(url.toString());
  }

  const handleSortOrder = (sortOrder: SortOrder) => {
    const url = updateUrlSearchParams('sortOrder', sortOrder);
    router.push(url.toString());
  }

  const handleGenreSelect = (genre: string) => {
    const url = updateUrlSearchParams('genre', genre);
    router.push(url.toString());
  }

  return (
      <div className="movie-filters d-flex justify-content-between" data-testid="movie-filters">
        <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={handleGenreSelect}/>
        <div className="d-flex align-items-center">
          <SortOrderControl sortOrder={sortOrder} onSortOrderChange={handleSortOrder}/>
          <SortControl sort={sortBy} onSortChange={handleSort}/>
        </div>
      </div>
  );
}

export default MovieFilters;

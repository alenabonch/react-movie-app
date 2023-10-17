import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy, SortOrder } from '../../../models/Movie';
import GenreSelect from '../GenreSelect/GenreSelect';
import SortControl from '../SortControl/SortControl';
import SortOrderControl from '../SortOrder/SortOrderControl';

interface MovieFiltersProps {
  genres: string[]
}

function MovieFilters({genres} : MovieFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') as SortBy || 'release_date';
  const sortOrder = searchParams.get('sortOrder') as SortOrder || 'desc';
  const selectedGenre = searchParams.get('genre') || genres[0];

  const handleSort = (sortBy: SortBy) => {
    searchParams.set('sortBy', sortBy);
    setSearchParams(searchParams);
  }

  const handleSortOrder = (sortOrder: SortOrder) => {
    searchParams.set('sortOrder', sortOrder);
    setSearchParams(searchParams);
  }

  const handleGenreSelect = (genre: string) => {
    searchParams.set('genre', genre);
    setSearchParams(searchParams);
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

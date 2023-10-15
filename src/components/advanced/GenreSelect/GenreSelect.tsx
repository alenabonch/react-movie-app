import React from 'react';
import './GenreSelect.scss'

interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (text: string) => void;
}

function GenreSelect({genres, selectedGenre, onSelect}: GenreSelectProps) {
  const handleGenreSelect = (genre: string) => {
    onSelect(genre);
  }

  return (
    <div className="genre-select py-2">
      {genres.map((genre) => (
          <button
              key={genre}
              onClick={handleGenreSelect.bind(null, genre)}
              className={genre === selectedGenre ? 'active' : ''}
              data-testid="genre-button">
            {genre}
          </button>
      ))}
    </div>
  );
}

export default GenreSelect;

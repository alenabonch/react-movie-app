import React, { useState } from 'react';
import './GenreSelect.scss'

interface GenreSelectProps {
  genres: string[];
  initialSelectedGenre: string;
  onSelect: (text: string) => void;
}

function GenreSelect({genres, initialSelectedGenre, onSelect}: GenreSelectProps) {
  const [selectedGenre, setSelectedGenre] = useState(initialSelectedGenre);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    onSelect(genre);
  }

  return (
    <div className="genre-select py-2">
      {genres.map((genre) => (
          <button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={genre === selectedGenre ? 'active' : ''}
              data-testid="genre-button">
            {genre}
          </button>
      ))}
    </div>
  );
}

export default GenreSelect;

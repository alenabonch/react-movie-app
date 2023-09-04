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
    <div className="genre-select m-3">
      {genres.map((genre) => (
          <button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              className={genre === selectedGenre ? 'active' : ''}>
            {genre}
          </button>
      ))}
    </div>
  );
}

export default GenreSelect;

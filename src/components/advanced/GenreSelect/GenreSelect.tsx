import React from 'react';
import styles from './GenreSelect.module.scss'

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
    <div className={styles.genreSelect}>
      {genres.map((genre) => (
          <button
              key={genre}
              onClick={handleGenreSelect.bind(null, genre)}
              className={genre === selectedGenre ? styles.genreSelect + ' ' + styles.active : ''}
              data-testid="genre-button">
            {genre}
          </button>
      ))}
    </div>
  );
}

export default GenreSelect;

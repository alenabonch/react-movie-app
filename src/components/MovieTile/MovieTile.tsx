import React from 'react';
import './MovieTile.scss';

export interface MovieInfo {
  id: string;
  name: string;
  year: string;
  imageUrl: string;
  genres: string[];
}

interface MovieTileProps {
  movieInfo: MovieInfo;
  onClick: (id: string) => void;
}

function MovieTile({movieInfo, onClick}: MovieTileProps) {
  const handleTileClick = () => {
    onClick(movieInfo.id);
  }

  return (
    <div className="movie-tile" onClick={handleTileClick} data-testid="movie-tile">
      <img className="movie-tile__image" src={movieInfo.imageUrl} alt=""/>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="movie-tile__name text-truncate">{movieInfo.name}</h3>
        <span className="movie-tile__year">{movieInfo.year}</span>
      </div>
      <div className="movie-tile__genres text-truncate">
        {movieInfo.genres.join(', ')}
      </div>
    </div>
  );
}

export default MovieTile;

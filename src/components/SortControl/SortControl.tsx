import React from 'react';
import './SortControl.scss';

export type SortType = 'title' | 'releaseDate';

interface SortControlProps {
  sort: SortType;
  onSortChange: (sort: SortType) => void;
}

function SortControl({sort, onSortChange}: SortControlProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortType);
  }

  return (
    <div className="sort-control d-flex justify-content-center align-items-center">
      <label htmlFor="sort" className="sort-control__label">Sort By</label>
      <select className="sort-control__select" name="sort" id="sort" value={sort} onChange={handleSortChange}>
        <option value="releaseDate">RELEASE DATE</option>
        <option value="title">TITLE</option>
      </select>
    </div>
  );
}

export default SortControl;

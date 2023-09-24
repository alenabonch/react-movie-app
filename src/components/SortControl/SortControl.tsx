import React from 'react';
import './SortControl.scss';
import { SortBy } from '../../models/Movie';

interface SortControlProps {
  sort: SortBy;
  onSortChange: (sort: SortBy) => void;
}

function SortControl({sort, onSortChange}: SortControlProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortBy);
  }

  return (
    <div className="sort-control d-flex justify-content-center align-items-center">
      <label htmlFor="sort" className="sort-control__label">Sort By</label>
      <select className="sort-control__select" name="sort" id="sort" data-testid="sort-select" value={sort} onChange={handleSortChange}>
        <option value="release_date">RELEASE DATE</option>
        <option value="title">TITLE</option>
      </select>
    </div>
  );
}

export default SortControl;

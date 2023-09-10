import React, { useState } from 'react';
import './SortControl.scss';

export type SortType = 'title' | 'year';

interface SortControlProps {
  initialSort: SortType;
  onSortChange: (SortType: string) => void;
}

function SortControl({initialSort, onSortChange}: SortControlProps) {
  const [sort, setSort] = useState(initialSort);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as SortType);
    onSortChange(event.target.value);
  }

  return (
    <div className="sort-control d-flex justify-content-center align-items-center">
      <label htmlFor="sort" className="sort-control__label">Sort By</label>
      <select className="sort-control__select" name="sort" id="sort" value={sort} onChange={handleSortChange}>
        <option value="year">RELEASE DATE</option>
        <option value="title">TITLE</option>
      </select>
    </div>
  );
}

export default SortControl;

import React from 'react';
import { SortOrder } from '../../models/Movie';
import "./SortOrderControl.scss"

interface SortOrderControlProps {
  sortOrder: SortOrder;
  onSortOrderChange: (sort: SortOrder) => void;
}

function SortOrderControl({sortOrder, onSortOrderChange}: SortOrderControlProps) {
  const handleSortOrderChange = (sortOrder: SortOrder) => {
    onSortOrderChange(sortOrder);
  }

  return (
    <div className="sort-order d-flex justify-content-center">
      <button aria-label="Sort Down"
              className={`sort-order__button ${sortOrder ===  'desc' ? 'active' : ''}`}
              onClick={handleSortOrderChange.bind(null, 'desc')}>
        <i className="fa-solid fa-arrow-down-wide-short"></i>
      </button>
      <button aria-label="Sort Up"
              className={`sort-order__button ${sortOrder ===  'asc' ? 'active' : ''}`}
              onClick={handleSortOrderChange.bind(null, 'asc')}>
        <i className="fa-solid fa-arrow-up-short-wide"></i>
      </button>
    </div>
  );
}

export default SortOrderControl;

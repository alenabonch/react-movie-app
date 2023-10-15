import React from 'react';
import { SortOrder } from '../../../models/Movie';
import "./SortOrderControl.scss"

interface SortOrderControlProps {
  sortOrder: SortOrder;
  onSortOrderChange: (sort: SortOrder) => void;
}

function SortOrderControl({sortOrder, onSortOrderChange}: SortOrderControlProps) {
  const handleSortOrderChange = (sortOrder: SortOrder) => {
    onSortOrderChange(sortOrder);
  }

  const sortOrderConfigs: {order: SortOrder, label: string, icon: string}[] = [
    {order: 'desc', label: 'Sort Down', icon: 'fa-arrow-down-wide-short'},
    {order: 'asc', label: 'Sort Up', icon: 'fa-arrow-up-short-wide'}
  ];

  return (
    <div className="sort-order d-flex justify-content-center">
      {
        sortOrderConfigs.map(config => (
            <button aria-label={config.label}
                    disabled={sortOrder ===  config.order}
                    key={config.label}
                    className={`sort-order__button ${sortOrder ===  config.order ? 'active' : ''}`}
                    onClick={handleSortOrderChange.bind(null, config.order)}>
              <i className={`fa-solid ${config.icon}`}></i>
            </button>
        ))
      }
    </div>
  );
}

export default SortOrderControl;

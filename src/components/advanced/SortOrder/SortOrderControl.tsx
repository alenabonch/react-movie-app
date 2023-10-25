'use client'
import { SortOrder } from '@models/Movie';
import styles from "./SortOrderControl.module.scss"

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
    <div className={styles.sortOrder}>
      {
        sortOrderConfigs.map(config => (
            <button aria-label={config.label}
                    disabled={sortOrder ===  config.order}
                    key={config.label}
                    className={`${styles.sortOrder__button} ${sortOrder ===  config.order ? styles.sortOrder__button + ' ' + styles.active : ''}`}
                    onClick={handleSortOrderChange.bind(null, config.order)}>
              <i className={`fa-solid ${config.icon}`}></i>
            </button>
        ))
      }
    </div>
  );
}

export default SortOrderControl;

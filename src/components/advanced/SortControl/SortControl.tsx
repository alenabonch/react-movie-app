import React from 'react';
import { SortBy } from '../../../models/Movie';
import styles from './SortControl.module.scss';

interface SortControlProps {
  sort: SortBy;
  onSortChange: (sort: SortBy) => void;
}

function SortControl({sort, onSortChange}: SortControlProps) {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortBy);
  }

  return (
    <div className={styles.sortControl}>
      <label htmlFor="sort" className={styles.sortControl__label}>Sort By</label>
      <select className={styles.sortControl__select} name="sort" id="sort" data-testid="sort-select" value={sort} onChange={handleSortChange}>
        <option value="release_date">RELEASE DATE</option>
        <option value="title">TITLE</option>
      </select>
    </div>
  );
}

export default SortControl;

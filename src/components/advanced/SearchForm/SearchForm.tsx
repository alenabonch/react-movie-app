'use client'
import { Button } from '@components/common/Button/Button';
import { updateUrlSearchParams } from '@utils/RouterUtils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import styles from './SearchForm.module.scss';

function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const onSearch = (query: string) => {
    const url = updateUrlSearchParams('query', query);
    router.push(url.toString());
  }

  const handleSearchClear = () => {
    setQuery('');
    onSearch('');
  }

  const handleSearchClick = () => {
    onSearch(query);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  }

  return (
      <div className={styles.searchForm}>
        <label htmlFor="search-input" className={styles.searchForm__label}>Find your movie</label>
        <div className="d-flex">
          <div className="d-flex position-relative w-100">
            <input
                type="text"
                id="search-input"
                name="search-input"
                data-testid="search-input"
                className="form-control"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="What do you want to watch?"
            />
            {
              query &&
                <button onClick={handleSearchClear} className={styles.searchForm__clear} aria-label="Clear Search">
                  <i className="fa-solid fa-xmark"></i>
                </button>
            }
          </div>
          <Button
              data-testid="search-button"
              onClick={handleSearchClick}
              primary
              size="medium">
            Search
          </Button>
        </div>
      </div>
  );
}

export default SearchForm;

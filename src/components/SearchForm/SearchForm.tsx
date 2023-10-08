import React, { ChangeEvent, useState } from 'react';
import { Outlet, useOutletContext, useSearchParams } from 'react-router-dom';
import { Button } from '../Button/Button';
import './SearchForm.scss';

function SearchForm() {
  const contextData = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const onSearch = (query: string) => {
    searchParams.set('query', query);
    setSearchParams(searchParams);
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
      <div className="search-form p-5">
        <label htmlFor="search-input" className="mb-4 search-form__label">Find your movie</label>
        <div className="d-flex">
          <div className="d-flex position-relative w-100">
            <input
                type="text"
                id="search-input"
                name="search-input"
                data-testid="search-input"
                className="search-form__input form-control"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="What do you want to watch?"
            />
            {
              query &&
                <i aria-label="Clear Search"
                   className="search-form__clear fa-solid fa-xmark"
                   onClick={handleSearchClear}
                ></i>
            }
          </div>
          <Button
              dataTestId="search-button"
              onClick={handleSearchClick}
              primary
              size="medium">
            Search
          </Button>
        </div>
        <Outlet context={contextData}/>
      </div>
  );
}

export default SearchForm;

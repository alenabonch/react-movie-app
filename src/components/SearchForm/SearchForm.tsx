import React, { ChangeEvent, useState } from 'react';
import './SearchForm.scss';

interface SearchFormProps {
  initialQuery?: string;
  onSearch: (text: string) => void;
}

function SearchForm({initialQuery = '', onSearch}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
    <div className="search-form">
      <label htmlFor="search-input" className="mb-4 search-form-label">Find your movie</label>
      <div className="d-flex">
        <input
            type="text"
            id="search-input"
            name="search-input"
            className="form-control search-form-input"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to watch?"
        />
        <button onClick={handleSearchClick} className="btn btn-primary">Search</button>
      </div>
    </div>
  );
}

export default SearchForm;

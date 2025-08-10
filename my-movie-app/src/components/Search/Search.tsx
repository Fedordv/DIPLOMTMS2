import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterAccordion from '../FilterAccordion/FilterAccordion';
import './Search.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [year, setYear] = useState(searchParams.get('y') || '');
  const [type, setType] = useState(searchParams.get('type') || '');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (year) params.set('y', year);
    if (type) params.set('type', type);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search movies..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="filter-group">
        <FilterAccordion
          onYearChange={setYear}
          onTypeChange={setType}
        />
      </div>
    </div>
  );
};

export default Search;

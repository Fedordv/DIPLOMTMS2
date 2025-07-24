import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setPage } from '../../store/slices/moviesSlice';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  
  // Используем параметры из URL для инициализации
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [year, setYear] = useState(searchParams.get('y') || '');
  const [type, setType] = useState(searchParams.get('type') || '');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (year) params.set('y', year);
    if (type) params.set('type', type);
    params.set('page', '1'); // Всегда сбрасываем на первую страницу
    
    setSearchParams(params);
    dispatch(setPage(1)); // Сбрасываем страницу в Redux
  };

  // Добавим обработку нажатия Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Синхронизация с URL при изменении фильтров
  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    const currentYear = searchParams.get('y') || '';
    const currentType = searchParams.get('type') || '';
    
    setQuery(currentQuery);
    setYear(currentYear);
    setType(currentType);
  }, [searchParams]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Поиск фильмов..."
      />
      
      <select 
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Все годы</option>
        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Все типы</option>
        <option value="movie">Фильмы</option>
        <option value="series">Сериалы</option>
        <option value="episode">Эпизоды</option>
        <option value="game">Игры</option>
      </select>

      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default Search;
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/movieService';
import { 
  setMovies, 
  setLoading, 
  setError, 
  setPage,
  setTotalPages // Добавляем импорт
} from '../../store/slices/moviesSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import type { RootState, AppDispatch } from '../../store/store';
import MovieCard from '../../components/MovieCard/MovieCard';
import Search from '../../components/Search/Search';
import './home.scss';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { 
    list, 
    isLoading, 
    error, 
    currentPage,
    totalPages // Используем totalPages
  } = useSelector((state: RootState) => state.movies);
  
  const favorites = useSelector((state: RootState) => state.favorites.list);

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchParams.get('q') || 'hobbit';
      const page = Number(searchParams.get('page')) || 1;
      const year = searchParams.get('y') || undefined;
      const type = searchParams.get('type') || undefined;
      
      dispatch(setLoading(true));
      try {
        const data = await searchMovies(query, page, year, type);
        if (data.Response === 'True') {
          dispatch(setMovies(data.Search));
          dispatch(setPage(page));
          
          // Рассчитываем общее количество страниц
          const totalResults = parseInt(data.totalResults || '0');
          const calculatedTotalPages = Math.ceil(totalResults / 10);
          dispatch(setTotalPages(calculatedTotalPages));
        } else {
          dispatch(setError(data.Error || 'Фильмы не найдены'));
        }
      } catch (err) {
        dispatch(setError('Ошибка при загрузке фильмов'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovies();
  }, [searchParams, dispatch]);

  const handleFavorite = (imdbID: string) => {
    if (favorites.includes(imdbID)) {
      dispatch(removeFromFavorites(imdbID));
    } else {
      dispatch(addToFavorites(imdbID));
    }
  };

  // Функция для изменения страницы
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="home-page">
      <Search />
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="movies-grid">
        {list.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            isFavorite={favorites.includes(movie.imdbID)} 
            onFavoriteToggle={handleFavorite} 
          />
        ))}
      </div>
      
      {/* Пагинация */}
      <div className="pagination">
        <button 
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Назад
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button 
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Вперед
        </button>
        <button onClick={() => {
          localStorage.removeItem('cookie_consent');
          window.location.reload();
        }}>
          Сбросить cookie согласие
        </button>
      </div>
    </div>
  );
};

export default Home;
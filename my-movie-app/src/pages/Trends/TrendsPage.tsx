import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import { fetchTrendingMovies } from '../../store/slices/moviesSlice';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loader from '../../components/Loader/Loader';
import './TrendsPage.css';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';

const TrendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trendingList, isLoading, error } = useSelector((state: RootState) => state.movies);
  const favorites = useSelector((state: RootState) => state.favorites.list);
  
  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const handleFavoriteToggle = (imdbID: string) => {
    if (favorites.includes(imdbID)) {
      dispatch(removeFromFavorites(imdbID));
    } else {
      dispatch(addToFavorites(imdbID));
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="trends-page">
      <h1>Популярные фильмы</h1>
      <div className="trends-grid">
        {trendingList.map((movie) => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendsPage;
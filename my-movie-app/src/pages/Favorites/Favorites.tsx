import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import MovieCard from '../../components/MovieCard/MovieCard';
import { removeFromFavorites } from '../../store/slices/favoritesSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.list);
  const movies = useSelector((state: RootState) => state.movies.list);

  const favoriteMovies = movies.filter(movie => 
    favorites.includes(movie.imdbID)
  );

  const handleFavoriteToggle = (imdbID: string) => {
    dispatch(removeFromFavorites(imdbID));
  };

  return (
    <div className="favorites-page">
      <h1>Избранное</h1>
      {favoriteMovies.length === 0 ? (
        <p>Список избранного пуст</p>
      ) : (
        <div className="movies-grid">
          {favoriteMovies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

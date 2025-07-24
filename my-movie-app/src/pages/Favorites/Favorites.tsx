import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import MovieCard from '../../components/MovieCard/MovieCard';

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.list);
  const movies = useSelector((state: RootState) => state.movies.list);

  const favoriteMovies = movies.filter(movie => 
    favorites.includes(movie.imdbID)
  );

  return (
    <div className="favorites-page">
      <h1>Избранное</h1>
      {favoriteMovies.length === 0 ? (
        <p>Список избранного пуст</p>
      ) : (
        <div className="movies-grid">
          {favoriteMovies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} isFavorite={false} onFavoriteToggle={function (_imdbID: string): void {
              throw new Error('Function not implemented.');
            } } />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
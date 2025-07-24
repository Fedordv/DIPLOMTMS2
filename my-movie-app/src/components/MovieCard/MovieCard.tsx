import { Link } from 'react-router-dom';
import type { Movie } from '../../types/types';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteToggle: (imdbID: string) => void;
}

// Функция для преобразования типа
const getTypeLabel = (type: string) => {
  switch (type.toLowerCase()) {
    case 'movie': return 'Фильм';
    case 'series': return 'Сериал';
    case 'episode': return 'Эпизод';
    case 'game': return 'Игра';
    default: return type;
  }
};

const MovieCard = ({ movie, isFavorite, onFavoriteToggle }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'} 
          alt={movie.Title} 
        />
      </Link>
      <div className="movie-info">
        <h3>
          <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
        </h3>
        <div className="movie-meta">
          <span>{movie.Year}</span>
          {movie.Type && (
            <span className="movie-type">
              {getTypeLabel(movie.Type)}
            </span>
          )}
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            onFavoriteToggle(movie.imdbID);
          }}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '❤️' : '♡'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
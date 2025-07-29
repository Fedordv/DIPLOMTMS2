import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../../services/movieService';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import type { AppDispatch, RootState } from '../../store/store';
import Loader from '../../components/Loader/Loader'; 
import './movie.scss';

// Создаем тип для детальной информации о фильме
interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.list);
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isFavorite = id ? favorites.includes(id) : false;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) {
          setError('ID фильма не указан');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        const data = await getMovieById(id);
        
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Фильм не найден');
        }
      } catch (err) {
        setError('Ошибка при загрузке фильма');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavorite = () => {
    if (!id) return;
    
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="no-movie">Фильм не найден</div>;

  return (
    <div className="movie-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Назад
      </button>
      
      <div className="movie-header">
        <h1>{movie.Title} ({movie.Year})</h1>
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
        >
          {isFavorite ? '★ В избранном' : '☆ В избранное'}
        </button>
      </div>

      <div className="movie-content">
        <div className="movie-poster">
        <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/images/placeholder.jpg'}
            alt={movie.Title}
            className="movie-poster-img"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallback) {
                img.src = '/images/placeholder.jpg';
                img.dataset.fallback = 'true';
              }
            }}
                />

        </div>
        
        <div className="movie-details">
          <div className="detail-row">
            <span>Рейтинг:</span>
            <strong>{movie.Rated}</strong>
          </div>
          <div className="detail-row">
            <span>Дата выхода:</span>
            <span>{movie.Released}</span>
          </div>
          <div className="detail-row">
            <span>Продолжительность:</span>
            <span>{movie.Runtime}</span>
          </div>
          <div className="detail-row">
            <span>Жанр:</span>
            <span>{movie.Genre}</span>
          </div>
          <div className="detail-row">
            <span>Режиссер:</span>
            <span>{movie.Director}</span>
          </div>
          <div className="detail-row">
            <span>Актеры:</span>
            <span>{movie.Actors}</span>
          </div>
          <div className="detail-row">
            <span>Страна:</span>
            <span>{movie.Country}</span>
          </div>
          <div className="detail-row">
            <span>Рейтинг IMDb:</span>
            <span className="imdb-rating">{movie.imdbRating}</span>
          </div>
        </div>
      </div>

      <div className="movie-plot">
        <h3>Описание</h3>
        <p>{movie.Plot}</p>
      </div>

      <div className="movie-ratings">
        <h3>Рейтинги</h3>
        <ul>
          {movie.Ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.Source}:</strong> {rating.Value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviePage;
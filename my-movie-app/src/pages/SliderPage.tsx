import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies } from '../services/movieService';
import { setMovies, setLoading, setError } from '../store/slices/moviesSlice';
import type { RootState, AppDispatch } from '../store/store';
import MovieSlider from '../components/MovieSlider/MovieSlider';
import Loader from '../components/Loader/Loader';
import './SliderPage.css';

const SliderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trendingList, isLoading, error } = useSelector((state: RootState) => state.movies);
  
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        dispatch(setLoading(true));
        const movies = await getTrendingMovies();
        dispatch(setMovies(movies));
      } catch (err) {
        dispatch(setError('Ошибка при загрузке фильмов для слайдера'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTrendingMovies();
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <div className="error">{error}</div>;
  if (!trendingList.length) return <div>Нет фильмов для отображения</div>;

  return (
    <div className="slider-page">
      <h1 className="page-title">Популярные фильмы</h1>
      <MovieSlider movies={trendingList} />
    </div>
  );
};

export default SliderPage;
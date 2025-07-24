import axios from 'axios';
import type { Movie } from '../types/types';

export const API_KEY = '923b34d9';
export const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (
  query: string, 
  page: number = 1, 
  year?: string, 
  type?: string
) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      page,
      y: year,
      type
    },
  });
  return response.data;
};

export const getMovieById = async (id: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return response.data;
};

export const getTrendingMovies = async () => {
  // Список популярных запросов для трендов
  const trendingQueries = ['matrix', 'avengers', 'batman', 'star wars', 'inception', 'interstellar'];
  
  // Собираем все запросы в один массив промисов
  const requests = trendingQueries.map(query => 
    axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: 1
      }
    })
  );
  
  try {
    // Выполняем все запросы параллельно
    const responses = await Promise.all(requests);
    
    // Фильтруем успешные ответы и объединяем результаты
    const movies = responses.reduce<Movie[]>((acc, response) => {
      if (response.data.Response === 'True' && response.data.Search) {
        return [...acc, ...response.data.Search];
      }
      return acc;
    }, []);
    
    // Удаляем дубликаты по imdbID
    const uniqueMovies = movies.filter(
      (movie, index, self) => index === self.findIndex(m => m.imdbID === movie.imdbID)
    );
    
    return uniqueMovies;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Failed to fetch trending movies');
  }
};
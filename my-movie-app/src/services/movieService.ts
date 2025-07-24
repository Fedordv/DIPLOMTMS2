import axios from 'axios';
import type { Movie } from '../types/types';

export const API_KEY = '923b34d9';
export const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (
  query: string, 
  page: number = 1, 
  year?: string, 
  type?: string
): Promise<any> => {
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

export const getMovieById = async (id: string): Promise<any> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return response.data;
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const trendingQueries = ['avengers', 'star wars', 'batman', 'inception', 'interstellar'];
  
  try {
    const requests = trendingQueries.map(query => 
      axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query,
          page: 1
        }
      })
    );
    
    const responses = await Promise.all(requests);
    const movies = responses.reduce<Movie[]>((acc, response) => {
      if (response.data.Response === 'True' && response.data.Search) {
        return [...acc, ...response.data.Search];
      }
      return acc;
    }, []);
    
    // Удаляем дубликаты
    const uniqueMovies = movies.filter(
      (movie, index, self) => 
        index === self.findIndex(m => m.imdbID === movie.imdbID)
    );
    
    // Получаем детали для каждого фильма
    const detailedRequests = uniqueMovies.map(movie => 
      getMovieById(movie.imdbID)
    );
    
    const detailedMovies = await Promise.all(detailedRequests);
    return detailedMovies.filter(movie => movie.Response === 'True');
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Failed to fetch trending movies');
  }
};
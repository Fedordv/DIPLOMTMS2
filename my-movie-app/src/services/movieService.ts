import axios from 'axios';
import type { Movie, MovieDetails } from '../types/types';

export const API_KEY = '923b34d9';
export const BASE_URL = 'http://www.omdbapi.com/';

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

// Поиск фильмов по ключевому слову
export const searchMovies = async (
  query: string,
  page: number = 1,
  year?: string,
  type?: string
): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse>(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      page,
      y: year,
      type,
    },
  });
  return response.data;
};

// Получить фильм по ID
export const getMovieById = async (id: string): Promise<MovieDetails> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return response.data;
};

// Получить список популярных фильмов (без перегрузки)
export const getTrendingMovies = async (): Promise<Movie[]> => {
  const query = 'avengers'; // Можно заменить на 'batman', 'star wars', 'inception' и т.д.
  const pagesToFetch = 5; // Загрузим 5 страниц по 10 фильмов (итого до 50)

  try {
    const requests = Array.from({ length: pagesToFetch }, (_, i) =>
      axios.get<SearchResponse>(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: query,
          page: i + 1,
        },
      })
    );

    const responses = await Promise.all(requests);
    const movies: Movie[] = responses.flatMap(res =>
      res.data.Response === 'True' ? res.data.Search : []
    );

    // Уникальные фильмы по imdbID
    const uniqueMovies = movies.filter(
      (movie, index, self) =>
        index === self.findIndex(m => m.imdbID === movie.imdbID)
    );

    return uniqueMovies;
  } catch (error) {
    console.error('Ошибка при получении популярных фильмов:', error);
    return [];
  }
};

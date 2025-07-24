import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/types';
import { API_KEY, BASE_URL, getTrendingMovies } from '../../services/movieService';
import type { AppDispatch } from '../store';

interface MoviesState {
  list: Movie[];
  trendingList: Movie[]; // Добавляем отдельный список для трендов
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  yearFilter: string;
  typeFilter: string;
  isLoading: boolean;
  error: string | null;
  currentMovie: Movie | null;
  
}

const initialState: MoviesState = {
  list: [],
  trendingList: [], // Инициализируем новый список
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
  yearFilter: '',
  typeFilter: '',
  isLoading: false,
  error: null,
  currentMovie: null
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.list = action.payload;
    },
    setTrendingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.trendingList = action.payload; // Добавляем новый reducer
    },
    setCurrentMovie: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
     setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setYearFilter: (state, action: PayloadAction<string>) => {
      state.yearFilter = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// Добавляем асинхронный thunk для загрузки трендов
export const fetchTrendingMovies = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const trendingMovies = await getTrendingMovies();
    dispatch(setTrendingMovies(trendingMovies));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError('Failed to load trending movies'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { 
  setMovies, 
  setTrendingMovies, // Экспортируем новый action
  setCurrentMovie,
  setPage, 
  setSearchQuery,
  setYearFilter,
  setTypeFilter,
  setLoading,
  setError,
  setTotalPages,
} = moviesSlice.actions;

export default moviesSlice.reducer;
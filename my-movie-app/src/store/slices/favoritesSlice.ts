import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  list: string[]; // массив imdbID фильмов
}

const initialState: FavoritesState = {
  list: JSON.parse(localStorage.getItem('favorites') || '[]')
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.list));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.list));
    }
  }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
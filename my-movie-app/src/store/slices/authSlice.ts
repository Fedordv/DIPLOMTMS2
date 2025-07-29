import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from '../store';
import { authService } from '../../services/authService';

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuth: !!localStorage.getItem('auth'),
  loading: false,
  error: null
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
    }
  },
});

// Асинхронные действия с правильной типизацией
export const login = (credentials: { email: string; password: string }): AppThunk => 
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      

      const response = await authService.login(credentials);
      dispatch(setUser(response.user));
      localStorage.setItem('auth', 'true');
      localStorage.setItem('auth', JSON.stringify(response.user));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Login failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const register = (userData: { email: string; password: string; name: string }): AppThunk => 
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.register(userData);
      dispatch(setUser(response.user));
      localStorage.setItem('auth', JSON.stringify(response.user));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  await authService.logout();
  dispatch(logoutUser());
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
};

export const checkAuth = (): AppThunk => (dispatch) => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const user = JSON.parse(authData);
      dispatch(setUser(user));
    } catch {
      localStorage.removeItem('auth');
    }
  }
};

export const { setUser, setLoading, setError, logoutUser } = authSlice.actions;
export default authSlice.reducer;
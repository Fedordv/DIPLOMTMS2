import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const useAuth = () => {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  return { user, isAuth };
};
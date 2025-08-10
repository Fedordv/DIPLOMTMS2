import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';

const PrivateRoute = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
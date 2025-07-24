import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import Favorites from './pages/Favorites/Favorites';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute';
import Settings from './pages/Settings/Settings';
import TrendsPage from './pages/Trends/TrendsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
           <Route path="trends" element={<TrendsPage />} />
           
          <Route element={<PrivateRoute />}>
            <Route path="favorites" element={<Favorites />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
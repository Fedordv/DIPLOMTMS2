import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import type { AppDispatch } from '../../store/store';
import '../../styles/layout.scss';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuth } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Pixema</Link>
      </div>
      
      <div className="search-icon">
        <Link to="/search"><FaSearch /></Link>
      </div>
      
      <div className="user-menu">
        {isAuth ? (
          <div className="dropdown-container">
            <button 
              className="user-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            >
              <FaUser />
              <span>{user?.name || 'User'}</span>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/settings" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaCog /> Настройки
                </Link>
                <button 
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login"><FaUser /></Link>
        )}
      </div>
    </header>
  );
};

export default Header;
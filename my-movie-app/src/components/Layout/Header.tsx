import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaCog, FaBars, FaFilter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import type { AppDispatch } from '../../store/store';
import Search from '../Search/Search';
import '../../styles/layout.scss';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuth } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNavigateToSettings = () => {
    navigate('/settings');
  }

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };
  

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Pixema</Link>
      </div>

      <div className="desktop-search">
        <Search />
      </div>

      <div className="header-actions">
        <div className="mobile-menu-toggle" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <FaFilter />
        </div>

        <div className="sidebar-toggle" onClick={onToggleSidebar}>
          <FaBars />
        </div>

        <div className="user-menu">
          {isAuth ? (
            <div className="dropdown-container">
              <div
                className="user-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              >
                <FaUser />
                <span>{user?.name || 'User'}</span>
              </div>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={handleNavigateToSettings}>
                    <FaCog /> Настройки
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt /> Выйти
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><FaUser /></Link>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <div className="mobile-search-panel">
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaCog, FaBars, FaFilter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import type { AppDispatch } from '../../store/store';
import Search from '../Search/Search';
import '../../styles/layout.scss';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleFilters: () => void;
}

const Header = ({ onToggleSidebar, onToggleFilters }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

      <div className="desktop-search">
        <Search />
      </div>

      <div className="header-actions">
        <button className="mobile-menu-toggle" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <FaBars />
        </button>

        <button className="filter-toggle" onClick={onToggleFilters}>
          <FaFilter />
        </button>

        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <FaBars />
        </button>

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
                  <Link to="/settings" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    <FaCog /> Настройки
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt /> Выйти
                  </button>
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

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { AppDispatch } from '../../store/store';
import './styles/global.scss'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="user-dropdown">
      <button 
        className="user-btn"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <FaUserCircle size={20} />
        <span>{user.name}</span>
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-menu"
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link 
            to="/settings" 
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
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
  );
};

export default UserDropdown;
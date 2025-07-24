import { NavLink } from 'react-router-dom';
import { FaHome, FaFire, FaHeart, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/trends" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaFire /> Trends
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHeart /> Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCog /> Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
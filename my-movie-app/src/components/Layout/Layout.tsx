import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../styles/layout.scss'; // Стили для Layout

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <Outlet /> {/* Здесь будут отображаться страницы (Home, Favorites и др.) */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
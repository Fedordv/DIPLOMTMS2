import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../styles/layout.scss'; 
import CookieConsent from '../Cookie/CookieConsent';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <Outlet /> 
        </main>
      </div>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
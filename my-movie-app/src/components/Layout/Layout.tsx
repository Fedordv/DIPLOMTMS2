import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../styles/layout.scss'; 
import CookieConsent from '../Cookie/CookieConsent';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="layout">
      <Header 
        onToggleSidebar={toggleSidebar} 

      />
      
      <div className="container">
        <Sidebar isOpen={isSidebarOpen} />
        
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

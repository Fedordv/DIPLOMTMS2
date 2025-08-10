// src/components/CookieConsent.tsx
import { useEffect, useState } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Мы используем файлы cookie, чтобы улучшить работу сайта и анализировать трафик.{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">Узнать больше</a>
      </p>
      <button onClick={handleAccept}>Принять</button>
    </div>
  );
};

export default CookieConsent;

import { useAuth } from '../../hooks/useAuth';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="settings-page">
      <h1>Настройки профиля</h1>
      <p>Email: {user?.email}</p>
      <p>Имя: {user?.name}</p>
    </div>
  );
};

export default Settings;
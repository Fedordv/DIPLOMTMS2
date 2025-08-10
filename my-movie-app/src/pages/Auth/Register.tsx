import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { AppDispatch } from '../../store/store';
// import './styles/auth.scss';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  if (isAuth) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register({ name, email, password }));
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Регистрация</h2>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Зарегистрироваться
        </button>
        <div className="auth-footer">
          Уже есть аккаунт? <Link to="/login">Войдите</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
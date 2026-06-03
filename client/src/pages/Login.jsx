import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/users`);
      const users = await response.json();

      if (!response.ok) {
        throw new Error('Server bilan bog\'lanishda xatolik');
      }

      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        localStorage.setItem('uzum_user', JSON.stringify(user));
        navigate('/');
        window.location.reload(); // Refresh to update navbar
      } else {
        throw new Error('Email yoki parol noto\'g\'ri');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-5 py-10">
      <div className="w-full max-w-[400px] bg-white p-8 rounded-2xl border border-border shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Kirish</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            required
            className="w-full h-12 px-4 rounded-xl border-2 border-border outline-none focus:border-uzum-purple transition-all bg-bg-secondary focus:bg-white"
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            name="password"
            placeholder="Parol" 
            required
            className="w-full h-12 px-4 rounded-xl border-2 border-border outline-none focus:border-uzum-purple transition-all bg-bg-secondary focus:bg-white"
            value={formData.password}
            onChange={handleChange}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-uzum-purple text-white font-bold rounded-xl hover:bg-uzum-purple-dark transition-all disabled:opacity-50"
          >
            {loading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
          <p className="text-center text-sm text-text-secondary mt-2">
            Akkountingiz yo'qmi? <Link to="/register" className="text-uzum-purple font-semibold hover:underline">Ro'yxatdan o'ting</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

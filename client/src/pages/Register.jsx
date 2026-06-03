import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
      }

      // Save user to localStorage
      localStorage.setItem('uzum_user', JSON.stringify(data));
      navigate('/');
      window.location.reload(); // Refresh to update navbar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-5 py-10">
      <div className="w-full max-w-[400px] bg-white p-8 rounded-2xl border border-border shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Ro'yxatdan o'tish</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            name="username"
            placeholder="F.I.SH (Username)" 
            required
            className="w-full h-12 px-4 rounded-xl border-2 border-border outline-none focus:border-uzum-purple transition-all bg-bg-secondary focus:bg-white"
            value={formData.username}
            onChange={handleChange}
          />
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
            placeholder="Parol yaratish" 
            required
            minLength={6}
            className="w-full h-12 px-4 rounded-xl border-2 border-border outline-none focus:border-uzum-purple transition-all bg-bg-secondary focus:bg-white"
            value={formData.password}
            onChange={handleChange}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-uzum-purple text-white font-bold rounded-xl hover:bg-uzum-purple-dark transition-all disabled:opacity-50"
          >
            {loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>
          <p className="text-center text-sm text-text-secondary mt-2">
            Akkountingiz bormi? <Link to="/login" className="text-uzum-purple font-semibold hover:underline">Kirish</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

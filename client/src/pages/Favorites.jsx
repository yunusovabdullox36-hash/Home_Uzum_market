import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('uzum_user') || 'null');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${apiUrl}/favorites/${currentUser._id}`);
        const data = await response.json();
        if (data && data.products) {
          setFavorites(data.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();

    const handleStorage = () => {
      fetchFavorites();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [navigate, currentUser?._id]);

  if (loading) return <div className="py-20 text-center">Yuklanmoqda...</div>;

  if (favorites.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 py-20 text-center">
        <div className="text-8xl mb-6">❤️</div>
        <h2 className="text-2xl font-bold mb-2">Sizga yoqqan mahsulotlarni qo'shing</h2>
        <p className="text-text-secondary mb-8">Buning uchun mahsulot kartasidagi yurakcha belgisini bosing</p>
        <Link to="/" className="inline-block bg-uzum-purple text-white font-bold px-8 py-3 rounded-xl hover:bg-uzum-purple-dark transition-all">
          Asosiy sahifaga o'tish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold mb-8">Istaklarim</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

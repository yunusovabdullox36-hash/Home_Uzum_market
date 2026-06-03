import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
          throw new Error('Mahsulotlarni yuklashda xatolik yuz berdi');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(query)
  );

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 py-10 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-uzum-purple rounded-full" role="status" aria-label="loading">
          <span className="sr-only">Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 py-10 text-center text-red-500">
        Xatolik: {error}
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {query ? `"${query}" bo'yicha natijalar` : 'Hamma mahsulotlar'}
        <span className="text-text-secondary font-normal text-base">({filteredProducts.length})</span>
      </h2>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-bg-secondary rounded-2xl">
          <p className="text-text-secondary text-lg">
            {query ? `"${query}" bo'yicha hech narsa topilmadi.` : "Hozircha mahsulotlar yo'q."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

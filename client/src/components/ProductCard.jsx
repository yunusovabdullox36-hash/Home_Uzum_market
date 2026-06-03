import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const { _id, title, price, oldPrice, images, rating, reviewsCount } = product;
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('uzum_user') || 'null');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!currentUser) return;

    const checkStatus = async () => {
      try {
        // Check Favorites
        const favRes = await fetch(`${apiUrl}/favorites/${currentUser._id}`);
        const favData = await favRes.json();
        if (favData && favData.products) {
          setIsFavorite(favData.products.some(p => p._id === _id));
        }

        // Check Cart
        const cartRes = await fetch(`${apiUrl}/carts/${currentUser._id}`);
        const cartData = await cartRes.json();
        if (cartData && cartData.items) {
          const item = cartData.items.find(item => item.product._id === _id);
          setQuantity(item ? item.quantity : 0);
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
    };

    checkStatus();
  }, [_id, currentUser?._id]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return alert("Iltimos, oldin tizimga kiring");
    if (loading) return;

    setLoading(true);
    try {
      if (isFavorite) {
        await fetch(`${apiUrl}/favorites/${currentUser._id}/${_id}`, { method: 'DELETE' });
        setIsFavorite(false);
      } else {
        await fetch(`${apiUrl}/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id, productId: _id })
        });
        setIsFavorite(true);
      }
      window.dispatchEvent(new Event('storage')); // Trigger navbar update
    } catch (err) {
      console.error("Favorite error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return alert("Iltimos, oldin tizimga kiring");
    if (loading) return;

    setLoading(true);
    try {
      await fetch(`${apiUrl}/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId: _id, quantity: 1 })
      });
      setQuantity(1);
      window.dispatchEvent(new Event('storage')); // Trigger navbar update
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (e, delta) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser || loading) return;

    setLoading(true);
    try {
      await fetch(`${apiUrl}/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId: _id, quantity: delta })
      });
      setQuantity(prev => prev + delta);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser || loading) return;

    setLoading(true);
    try {
      await fetch(`${apiUrl}/carts/${currentUser._id}/${_id}`, { method: 'DELETE' });
      setQuantity(0);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  const monthlyPrice = Math.round(price / 12);

  return (
    <div className="group bg-white rounded-xl overflow-hidden transition-all hover:shadow-xl border border-transparent hover:border-border p-0 flex flex-col h-full relative">
      <button 
        onClick={toggleFavorite}
        disabled={loading}
        className="absolute top-2 right-2 z-10 p-2 text-text-secondary hover:scale-110 transition-transform disabled:opacity-50"
      >
        {isFavorite ? (
          <AiFillHeart size={22} className="text-red-500" />
        ) : (
          <AiOutlineHeart size={22} className="hover:text-red-500" />
        )}
      </button>

      <div className="absolute top-2 left-2 z-10 bg-uzum-purple text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
        Aksiya
      </div>

      <Link to={`/product/${_id}`} className="aspect-[3/4] overflow-hidden bg-bg-secondary relative block rounded-t-xl">
        <img 
          src={images[0] || 'https://via.placeholder.com/300x400?text=No+Image'} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="flex flex-col flex-1 p-3">
        <Link to={`/product/${_id}`} className="text-[13px] leading-tight text-text-primary line-clamp-2 mb-2 group-hover:text-uzum-purple transition-colors h-8">
          {title}
        </Link>
        
        <div className="flex items-center gap-1 text-[11px] text-text-secondary mb-2">
          <span className="text-yellow-400">★</span>
          <span>{rating.toFixed(1)}</span>
          <span>({reviewsCount} sharh)</span>
        </div>

        <div className="bg-yellow-100 text-[#1f1f26] text-[11px] font-semibold px-2 py-0.5 rounded-md self-start mb-3">
          {monthlyPrice.toLocaleString()} so'm/oy
        </div>

        <div className="mt-auto flex items-center justify-between gap-1">
          <div className="flex flex-col">
            {oldPrice > 0 && (
              <span className="text-[11px] text-text-secondary line-through">
                {oldPrice.toLocaleString()} so'm
              </span>
            )}
            <span className="text-[15px] font-bold text-text-primary">
              {price.toLocaleString()} so'm
            </span>
          </div>
          
          {quantity > 0 ? (
            <div className="flex items-center border border-uzum-purple rounded-lg overflow-hidden">
              <button onClick={(e) => quantity === 1 ? removeItem(e) : updateQuantity(e, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-bg-secondary text-xs disabled:opacity-50" disabled={loading}><AiOutlineMinus size={14} /></button>
              <span className="w-7 text-center text-xs font-bold text-uzum-purple">{quantity}</span>
              <button onClick={(e) => updateQuantity(e, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-bg-secondary text-xs disabled:opacity-50" disabled={loading}><AiOutlinePlus size={14} /></button>
            </div>
          ) : (
            <button 
              onClick={addToCart}
              disabled={loading}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-[#F3EEFE] hover:border-uzum-purple hover:text-uzum-purple transition-all disabled:opacity-50"
            >
              <AiOutlineShoppingCart size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

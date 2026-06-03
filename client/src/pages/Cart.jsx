import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('uzum_user') || 'null');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchCart = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(`${apiUrl}/carts/${currentUser._id}`);
      const data = await response.json();
      if (data && data.items) {
        setCartItems(data.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [navigate, currentUser?._id]);

  const updateQuantity = async (productId, delta) => {
    try {
      await fetch(`${apiUrl}/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId, quantity: delta })
      });
      fetchCart();
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await fetch(`${apiUrl}/carts/${currentUser._id}/${productId}`, { method: 'DELETE' });
      fetchCart();
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (loading) return <div className="py-20 text-center">Yuklanmoqda...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Savatda hozircha mahsulot yo'q</h2>
        <p className="text-text-secondary mb-8">Asosiy sahifadagi mahsulotlardan birini tanlang va savatga qo'shing</p>
        <Link to="/" className="inline-block bg-uzum-purple text-white font-bold px-8 py-3 rounded-xl hover:bg-uzum-purple-dark transition-all">
          Xarid qilishga o'tish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold mb-8">Savatda {cartItems.length} mahsulot bor</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white border border-border rounded-2xl overflow-hidden">
          <div className="p-6 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex gap-4 py-6 border-b border-border last:border-0">
                <div className="w-24 h-32 bg-bg-secondary rounded-lg overflow-hidden shrink-0">
                  <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between gap-4">
                    <Link to={`/product/${item.product._id}`} className="font-semibold text-text-primary hover:text-uzum-purple transition-colors line-clamp-2">
                      {item.product.title}
                    </Link>
                    <button onClick={() => removeItem(item.product._id)} className="text-text-secondary hover:text-red-500 p-1">
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.product._id, -1)} className="w-8 h-8 hover:bg-bg-secondary"><AiOutlineMinus /></button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, 1)} className="w-8 h-8 hover:bg-bg-secondary"><AiOutlinePlus /></button>
                    </div>
                    <div className="font-bold text-lg">{(item.product.price * item.quantity).toLocaleString()} so'm</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[350px]">
          <div className="bg-white border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-6">Buyurtmangiz</h2>
            <div className="flex flex-col gap-3 mb-6 border-b border-border pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Mahsulotlar:</span>
                <span>{totalPrice.toLocaleString()} so'm</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-6">
              <span className="text-sm font-semibold">Jami:</span>
              <span className="text-2xl font-bold text-uzum-purple">{totalPrice.toLocaleString()} so'm</span>
            </div>
            <button className="w-full h-12 bg-uzum-purple text-white font-bold rounded-xl hover:bg-uzum-purple-dark">
              Rasmiylashtirishga o'tish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

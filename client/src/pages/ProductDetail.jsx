import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiFillStar, AiOutlineStar, AiOutlineUser, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import { TbTruckDelivery } from 'react-icons/tb';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);

  // Comment state
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);

  const currentUser = JSON.parse(localStorage.getItem('uzum_user') || 'null');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchData = async () => {
    try {
      // Fetch Product
      const productRes = await fetch(`${apiUrl}/products/${id}`);
      if (!productRes.ok) throw new Error('Mahsulot topilmadi');
      const productData = await productRes.json();
      setProduct(productData);
      
      // Fetch All Comments and filter for this product
      const commentsRes = await fetch(`${apiUrl}/comments`);
      const allComments = await commentsRes.json();
      const filteredComments = allComments.filter(c => c.product?._id === id || c.product === id);
      setComments(filteredComments);

      // Check favorites if user logged in
      if (currentUser) {
        const favRes = await fetch(`${apiUrl}/favorites/${currentUser._id}`);
        const favData = await favRes.json();
        if (favData && favData.products) {
          setIsFavorite(favData.products.some(f => f._id === productData._id));
        }

        const cartRes = await fetch(`${apiUrl}/carts/${currentUser._id}`);
        const cartData = await cartRes.json();
        if (cartData && cartData.items) {
          const item = cartData.items.find(item => item.product._id === productData._id);
          setCartQuantity(item ? item.quantity : 0);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, currentUser?._id]);

  const toggleFavorite = async () => {
    if (!currentUser) return navigate('/login');
    if (actionLoading) return;

    setActionLoading(true);
    try {
      if (isFavorite) {
        await fetch(`${apiUrl}/favorites/${currentUser._id}/${product._id}`, { method: 'DELETE' });
        setIsFavorite(false);
      } else {
        await fetch(`${apiUrl}/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id, productId: product._id })
        });
        setIsFavorite(true);
      }
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const addToCart = async () => {
    if (!currentUser) return navigate('/login');
    if (actionLoading) return;

    setActionLoading(true);
    try {
      await fetch(`${apiUrl}/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId: product._id, quantity: 1 })
      });
      setCartQuantity(1);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const updateCartQuantity = async (delta) => {
    if (!currentUser || actionLoading) return;

    setActionLoading(true);
    try {
      await fetch(`${apiUrl}/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, productId: product._id, quantity: delta })
      });
      setCartQuantity(prev => prev + delta);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const removeCartItem = async () => {
    if (!currentUser || actionLoading) return;

    setActionLoading(true);
    try {
      await fetch(`${apiUrl}/carts/${currentUser._id}/${product._id}`, { method: 'DELETE' });
      setCartQuantity(0);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!currentUser) return navigate('/login');
    if (!newComment.trim()) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${apiUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: currentUser._id,
          product: id,
          text: newComment,
          rating: rating
        })
      });

      if (res.ok) {
        setNewComment('');
        setRating(5);
        fetchData(); // Refresh comments
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="py-20 text-center">Yuklanmoqda...</div>;
  if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-[1280px] mx-auto px-5 py-8">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Images */}
        <div className="flex-1">
          <div className="sticky top-24">
            <div className="bg-bg-secondary aspect-[3/4] rounded-3xl overflow-hidden mb-4">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="text-yellow-400">★</span>
              <span>{product.rating.toFixed(1)} ({comments.length} sharh)</span>
            </div>
            <button 
              onClick={toggleFavorite} 
              disabled={actionLoading}
              className="flex items-center gap-2 text-text-secondary hover:text-red-500 transition-colors disabled:opacity-50"
            >
              {isFavorite ? <AiFillHeart size={24} className="text-red-500" /> : <AiOutlineHeart size={24} />}
              <span className="text-[13px] font-medium">Istaklarga</span>
            </button>
          </div>

          <h1 className="text-3xl font-bold text-text-primary leading-tight">{product.title}</h1>

          <div className="flex flex-col gap-2 py-4 border-y border-border">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">{product.price.toLocaleString()} so'm</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <TbTruckDelivery size={24} className="text-text-secondary" />
              <div>
                <p className="font-semibold text-sm">Bepul yetkazib berish</p>
                <p className="text-xs text-text-secondary">1 kunda topshirish punktigacha</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 mt-auto">
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Miqdor:</span>
                <div className="flex items-center border border-uzum-purple rounded-lg overflow-hidden">
                  <button onClick={() => cartQuantity === 1 ? removeCartItem() : updateCartQuantity(-1)} disabled={actionLoading} className="w-10 h-10 flex items-center justify-center hover:bg-bg-secondary disabled:opacity-50"><AiOutlineMinus size={18} /></button>
                  <span className="w-12 text-center font-bold text-uzum-purple">{cartQuantity}</span>
                  <button onClick={() => updateCartQuantity(1)} disabled={actionLoading} className="w-10 h-10 flex items-center justify-center hover:bg-bg-secondary disabled:opacity-50"><AiOutlinePlus size={18} /></button>
                </div>
              </div>
            ) : (
              <button 
                onClick={addToCart}
                disabled={actionLoading}
                className="w-full h-14 bg-uzum-purple text-white font-bold rounded-2xl hover:bg-uzum-purple-dark transition-all disabled:opacity-50"
              >
                Savatga qo'shish
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description & Comments */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Description */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Mahsulot tavsifi</h2>
          <div className="text-text-primary leading-relaxed whitespace-pre-line mb-12">
            {product.description || "Ushbu mahsulot haqida ma'lumot kiritilmagan."}
          </div>

          {/* Comments List */}
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-8">Foydalanuvchilar sharhlari</h2>
            <div className="flex flex-col gap-8">
              {comments.length === 0 ? (
                <p className="text-text-secondary italic">Hozircha sharhlar yo'q. Birinchi bo'lib sharh qoldiring!</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="flex gap-4 pb-8 border-b border-border last:border-0">
                    <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary shrink-0">
                      <AiOutlineUser size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="font-bold text-sm">{comment.user?.username || 'Foydalanuvchi'}</div>
                      <div className="flex text-yellow-400 text-xs mb-1">
                        {[...Array(5)].map((_, i) => (
                          i < comment.rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} className="text-gray-300" />
                        ))}
                      </div>
                      <p className="text-text-primary text-[15px]">{comment.text}</p>
                      <span className="text-[11px] text-text-secondary mt-1">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="lg:col-span-1">
          <div className="bg-bg-secondary p-6 rounded-2xl sticky top-24">
            <h3 className="font-bold text-lg mb-4">Sharh qoldirish</h3>
            {currentUser ? (
              <form onSubmit={handlePostComment} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-text-secondary mb-2 block">Reyting bering:</label>
                  <div className="flex gap-1 text-2xl text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(star)}
                        className="hover:scale-110 transition-transform"
                      >
                        {star <= rating ? <AiFillStar /> : <AiOutlineStar className="text-gray-400" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-text-secondary mb-2 block">Sizning fikringiz:</label>
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Mahsulot haqida nima deb o'ylaysiz?"
                    className="w-full p-4 rounded-xl border-2 border-border focus:border-uzum-purple outline-none text-sm transition-all"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={actionLoading}
                  className="w-full py-3 bg-uzum-purple text-white font-bold rounded-xl hover:bg-uzum-purple-dark transition-all disabled:opacity-50"
                >
                  {actionLoading ? 'Yuborilmoqda...' : 'Yuborish'}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-text-secondary mb-4">Sharh qoldirish uchun tizimga kiring.</p>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-uzum-purple font-bold hover:underline"
                >
                  Kirish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
